import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SearchParams {
  legalBusinessName?: string;
  ueiSAM?: string;
  physicalAddressStateCode?: string;
  naicsCode?: string;
  sbaBusinessTypeCode?: string[];
  page?: number;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const SAM_API_KEY = Deno.env.get('SAM_GOV_API_KEY');
    if (!SAM_API_KEY) {
      throw new Error('SAM_GOV_API_KEY is not configured');
    }

    const { searchParams }: { searchParams: SearchParams } = await req.json();
    
    // Build query parameters - SAM.gov API limits to 10 records per request
    // Valid includeSections: entityRegistration, coreData, assertions, pointsOfContact, repsAndCerts
    const params = new URLSearchParams();
    params.append('api_key', SAM_API_KEY);
    params.append('registrationStatus', 'A');
    params.append('includeSections', 'entityRegistration,coreData,assertions,pointsOfContact');
    params.append('size', '10');
    
    // Add search parameters
    if (searchParams.legalBusinessName) {
      params.append('legalBusinessName', `*${searchParams.legalBusinessName}*`);
    }
    
    if (searchParams.ueiSAM) {
      params.append('ueiSAM', searchParams.ueiSAM);
    }
    
    if (searchParams.physicalAddressStateCode) {
      params.append('physicalAddressProvinceOrStateCode', searchParams.physicalAddressStateCode);
    }
    
    if (searchParams.naicsCode) {
      params.append('naicsCode', searchParams.naicsCode);
    }
    
    // Handle multiple SBA business type codes
    if (searchParams.sbaBusinessTypeCode && searchParams.sbaBusinessTypeCode.length > 0) {
      searchParams.sbaBusinessTypeCode.forEach(code => {
        params.append('sbaBusinessTypeCode', code);
      });
    }
    
    // Handle pagination
    if (searchParams.page && searchParams.page > 0) {
      params.append('page', String(searchParams.page));
    }

    const apiUrl = `https://api.sam.gov/entity-information/v3/entities?${params.toString()}`;
    
    console.log('Fetching from SAM.gov:', apiUrl.replace(SAM_API_KEY, 'REDACTED'));
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SAM.gov API error:', response.status, errorText);
      
      if (response.status === 401) {
        throw new Error('Invalid SAM.gov API key');
      } else if (response.status === 403) {
        throw new Error('Access denied to SAM.gov API');
      } else {
        throw new Error(`SAM.gov API error: ${response.status}`);
      }
    }

    const data = await response.json();
    
    // Transform the response for easier consumption
    const transformedData = {
      totalRecords: data.totalRecords || 0,
      partners: (data.entityData || []).map((entity: any) => ({
        ueiSAM: entity.entityRegistration?.ueiSAM || '',
        cageCode: entity.entityRegistration?.cageCode || '',
        legalBusinessName: entity.entityRegistration?.legalBusinessName || '',
        dbaName: entity.entityRegistration?.dbaName || '',
        physicalAddress: {
          addressLine1: entity.coreData?.physicalAddress?.addressLine1 || '',
          city: entity.coreData?.physicalAddress?.city || '',
          stateOrProvinceCode: entity.coreData?.physicalAddress?.stateOrProvinceCode || '',
          zipCode: entity.coreData?.physicalAddress?.zipCode || '',
        },
        website: entity.coreData?.entityInformation?.entityURL || '',
        // SBA business types are under coreData.businessTypes.sbaBusinessTypeList
        sbaBusinessTypeList: entity.coreData?.businessTypes?.sbaBusinessTypeList || [],
        naicsCodeList: entity.assertions?.naicsCode || [],
        governmentBusinessPOC: entity.pointsOfContact?.governmentBusinessPOC || null,
        electronicBusinessPOC: entity.pointsOfContact?.electronicBusinessPOC || null,
      })),
    };

    return new Response(JSON.stringify(transformedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error in sam-partner-search:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});