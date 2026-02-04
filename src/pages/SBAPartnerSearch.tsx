import { useState } from "react";
import { AppTopNav } from "@/components/AppTopNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { 
  Search, 
  Loader2, 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  ExternalLink,
  AlertCircle,
  Users,
  ChevronLeft,
  ChevronRight,
  Star,
  Handshake,
  Bookmark
} from "lucide-react";

interface SBABusinessType {
  sbaBusinessTypeCode: string;
  sbaBusinessTypeDesc: string;
  expirationDate?: string;
}

interface NAICSCode {
  naicsCode: string;
  naicsDescription?: string;
  isPrimary?: boolean;
}

interface ContactInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  title?: string;
}

interface Partner {
  ueiSAM: string;
  cageCode: string;
  legalBusinessName: string;
  dbaName: string;
  physicalAddress: {
    addressLine1: string;
    city: string;
    stateOrProvinceCode: string;
    zipCode: string;
  };
  website?: string;
  sbaBusinessTypeList: SBABusinessType[];
  naicsCodeList: NAICSCode[];
  governmentBusinessPOC: ContactInfo | null;
  electronicBusinessPOC: ContactInfo | null;
}

interface SearchResponse {
  totalRecords: number;
  partners: Partner[];
}

const SBA_CODES = {
  "2X": { name: "8(a)", color: "bg-purple-100 text-purple-700 border-purple-300" },
  "A6": { name: "HUBZone", color: "bg-blue-100 text-blue-700 border-blue-300" },
  "XX": { name: "WOSB", color: "bg-pink-100 text-pink-700 border-pink-300" },
  "A2": { name: "EDWOSB", color: "bg-pink-100 text-pink-700 border-pink-300" },
  "QF": { name: "SDVOSB", color: "bg-green-100 text-green-700 border-green-300" },
  "A5": { name: "VOSB", color: "bg-green-100 text-green-700 border-green-300" },
};

const STATES = [
  { code: "VA", name: "Virginia" },
  { code: "MD", name: "Maryland" },
  { code: "DC", name: "District of Columbia" },
  { code: "TX", name: "Texas" },
  { code: "CA", name: "California" },
  { code: "FL", name: "Florida" },
  { code: "NY", name: "New York" },
  { code: "PA", name: "Pennsylvania" },
  { code: "OH", name: "Ohio" },
  { code: "IL", name: "Illinois" },
  { code: "GA", name: "Georgia" },
  { code: "NC", name: "North Carolina" },
  { code: "CO", name: "Colorado" },
  { code: "AZ", name: "Arizona" },
  { code: "WA", name: "Washington" },
];

const NAICS_CODES = [
  { code: "541512", name: "Computer Systems Design" },
  { code: "541511", name: "Custom Programming" },
  { code: "541519", name: "Other Computer Services" },
  { code: "541330", name: "Engineering Services" },
  { code: "541611", name: "Management Consulting" },
  { code: "541690", name: "Other Scientific & Technical Consulting" },
  { code: "518210", name: "Data Processing & Hosting" },
];

export default function SBAPartnerSearch() {
  const [companyName, setCompanyName] = useState("");
  const [ueiNumber, setUeiNumber] = useState("");
  const [state, setState] = useState("");
  const [naicsCode, setNaicsCode] = useState("");
  const [activeCertFilters, setActiveCertFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const toggleCertFilter = (code: string) => {
    setActiveCertFilters(prev => 
      prev.includes(code) 
        ? prev.filter(c => c !== code)
        : [...prev, code]
    );
  };

  const handleSearch = async (page = 0) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    setCurrentPage(page);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('sam-partner-search', {
        body: {
          searchParams: {
            legalBusinessName: companyName || undefined,
            ueiSAM: ueiNumber || undefined,
            physicalAddressStateCode: state || undefined,
            naicsCode: naicsCode || undefined,
            sbaBusinessTypeCode: activeCertFilters.length > 0 ? activeCertFilters : undefined,
            page: page > 0 ? page : undefined,
          },
        },
      });

      if (fnError) throw fnError;
      if (data.error) throw new Error(data.error);
      
      setResults(data);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to search partners');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCompanyName("");
    setUeiNumber("");
    setState("");
    setNaicsCode("");
    setActiveCertFilters([]);
    setResults(null);
    setError(null);
    setHasSearched(false);
    setCurrentPage(0);
  };

  const getSBABadge = (code: string) => {
    const sbaInfo = SBA_CODES[code as keyof typeof SBA_CODES];
    return sbaInfo || { name: code, color: "bg-gray-100 text-gray-700 border-gray-300" };
  };

  const formatContactName = (contact: ContactInfo | null) => {
    if (!contact) return null;
    const parts = [contact.firstName, contact.lastName].filter(Boolean);
    return parts.length > 0 ? parts.join(" ") : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-600 to-blue-100">
      <AppTopNav />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-3 mb-2">
            🏛️ SBA Partner Discovery
          </h1>
          <p className="text-blue-100">
            Search SAM.gov for SBA-certified small business partners
          </p>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {Object.entries(SBA_CODES).map(([code, info]) => (
            <button
              key={code}
              onClick={() => toggleCertFilter(code)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeCertFilters.includes(code)
                  ? info.color + " ring-2 ring-offset-2 ring-blue-500"
                  : "bg-white/90 text-gray-700 border-gray-200 hover:bg-white"
              }`}
            >
              {code === "2X" && "🎯 "}
              {code === "A6" && "📍 "}
              {code === "XX" && "👩‍💼 "}
              {code === "A2" && "👩‍💼 "}
              {code === "QF" && "🎖️ "}
              {code === "A5" && "🏅 "}
              {info.name}
            </button>
          ))}
        </div>

        {/* Search Form */}
        <Card className="bg-white/95 backdrop-blur p-6 rounded-2xl shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <Input
                placeholder="Search by name..."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">UEI Number</label>
              <Input
                placeholder="12-character UEI"
                value={ueiNumber}
                onChange={(e) => setUeiNumber(e.target.value)}
                className="w-full font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state..." />
                </SelectTrigger>
                <SelectContent>
                  {STATES.map(s => (
                    <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NAICS Code</label>
              <Select value={naicsCode} onValueChange={setNaicsCode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select NAICS..." />
                </SelectTrigger>
                <SelectContent>
                  {NAICS_CODES.map(n => (
                    <SelectItem key={n.code} value={n.code}>
                      {n.code} - {n.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-center gap-3">
            <Button 
              onClick={() => handleSearch(0)} 
              disabled={loading}
              className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white px-8"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Search Partners
            </Button>
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </Card>

        {/* Error State */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results Section */}
        {!hasSearched && !loading && (
          <Card className="bg-white/90 p-12 rounded-2xl text-center">
            <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600">Enter search criteria to find partners</h3>
            <p className="text-gray-400 mt-2">Use the filters above or click a certification badge to get started</p>
          </Card>
        )}

        {hasSearched && !loading && results && (
          <>
            {/* Results Count & Pagination */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-white font-medium">
                Found {results.totalRecords.toLocaleString()} Partners
              </p>
              {results.totalRecords > 10 && (
                <div className="flex items-center gap-2 text-white">
                  <span className="text-sm">
                    Showing {currentPage * 10 + 1}-{Math.min((currentPage + 1) * 10, results.totalRecords)} of {results.totalRecords}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSearch(currentPage - 1)}
                    disabled={currentPage === 0 || loading}
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSearch(currentPage + 1)}
                    disabled={(currentPage + 1) * 10 >= results.totalRecords || loading}
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Results Grid */}
            {results.partners.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {results.partners.map((partner) => (
                  <Card
                    key={partner.ueiSAM}
                    className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer"
                    onClick={() => setSelectedPartner(partner)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{partner.legalBusinessName}</h3>
                        {partner.dbaName && (
                          <p className="text-sm text-gray-500">DBA: {partner.dbaName}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-xs text-gray-500">UEI: {partner.ueiSAM}</p>
                        {partner.cageCode && (
                          <p className="font-mono text-xs text-gray-500">CAGE: {partner.cageCode}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {partner.physicalAddress.city}, {partner.physicalAddress.stateOrProvinceCode}
                    </div>

                    {/* SBA Certifications */}
                    {partner.sbaBusinessTypeList.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {partner.sbaBusinessTypeList.map((sba, idx) => {
                          const badge = getSBABadge(sba.sbaBusinessTypeCode);
                          return (
                            <Badge 
                              key={idx} 
                              variant="outline"
                              className={`text-xs ${badge.color}`}
                            >
                              {badge.name}
                            </Badge>
                          );
                        })}
                      </div>
                    )}

                    {/* NAICS Codes */}
                    {partner.naicsCodeList.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {partner.naicsCodeList.slice(0, 4).map((naics, idx) => (
                          <span 
                            key={idx}
                            className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                          >
                            {naics.isPrimary && <Star className="h-3 w-3 text-yellow-500" />}
                            {naics.naicsCode}
                          </span>
                        ))}
                        {partner.naicsCodeList.length > 4 && (
                          <span className="text-xs text-gray-400">+{partner.naicsCodeList.length - 4} more</span>
                        )}
                      </div>
                    )}

                    {/* Contact */}
                    {partner.governmentBusinessPOC && formatContactName(partner.governmentBusinessPOC) && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        {formatContactName(partner.governmentBusinessPOC)}
                        {partner.governmentBusinessPOC.email && (
                          <span className="ml-2 text-blue-600">{partner.governmentBusinessPOC.email}</span>
                        )}
                      </div>
                    )}

                    <Button 
                      variant="link" 
                      className="p-0 mt-2 text-blue-600 hover:text-blue-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPartner(partner);
                      }}
                    >
                      View Full Profile →
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white/90 p-12 rounded-2xl text-center">
                <p className="text-xl">😕</p>
                <h3 className="text-lg font-semibold text-gray-600 mt-2">No partners found</h3>
                <p className="text-gray-400 mt-1">Try different filters or search criteria</p>
              </Card>
            )}
          </>
        )}

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-blue-900/50 rounded-xl text-center">
          <p className="text-blue-100 text-sm">
            📡 Data Source: SAM.gov Entity Management API (Official SBA/DSBS data)
          </p>
        </div>
      </main>

      {/* Partner Detail Modal */}
      <Dialog open={!!selectedPartner} onOpenChange={() => setSelectedPartner(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedPartner && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  {selectedPartner.legalBusinessName}
                </DialogTitle>
                {selectedPartner.dbaName && (
                  <p className="text-gray-500">DBA: {selectedPartner.dbaName}</p>
                )}
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* IDs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">UEI</label>
                    <p className="font-mono text-gray-900">{selectedPartner.ueiSAM}</p>
                  </div>
                  {selectedPartner.cageCode && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">CAGE Code</label>
                      <p className="font-mono text-gray-900">{selectedPartner.cageCode}</p>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">Address</label>
                  <p className="text-gray-900">
                    {selectedPartner.physicalAddress.addressLine1}<br />
                    {selectedPartner.physicalAddress.city}, {selectedPartner.physicalAddress.stateOrProvinceCode} {selectedPartner.physicalAddress.zipCode}
                  </p>
                </div>

                {/* Website */}
                {selectedPartner.website && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Website</label>
                    <a 
                      href={selectedPartner.website.startsWith('http') ? selectedPartner.website : `https://${selectedPartner.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      {selectedPartner.website}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}

                {/* SBA Certifications */}
                {selectedPartner.sbaBusinessTypeList.length > 0 && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase mb-2 block">SBA Certifications</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedPartner.sbaBusinessTypeList.map((sba, idx) => {
                        const badge = getSBABadge(sba.sbaBusinessTypeCode);
                        return (
                          <Badge 
                            key={idx} 
                            variant="outline"
                            className={`${badge.color}`}
                          >
                            {sba.sbaBusinessTypeDesc || badge.name}
                            {sba.expirationDate && (
                              <span className="ml-1 text-xs opacity-70">
                                (Exp: {sba.expirationDate})
                              </span>
                            )}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* NAICS Codes */}
                {selectedPartner.naicsCodeList.length > 0 && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase mb-2 block">NAICS Codes</label>
                    <div className="space-y-1">
                      {selectedPartner.naicsCodeList.map((naics, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          {naics.isPrimary && <Star className="h-4 w-4 text-yellow-500" />}
                          <span className="font-mono">{naics.naicsCode}</span>
                          {naics.naicsDescription && (
                            <span className="text-gray-500">- {naics.naicsDescription}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Points of Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPartner.governmentBusinessPOC && formatContactName(selectedPartner.governmentBusinessPOC) && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-xs font-medium text-gray-500 uppercase mb-2 block">Government Business POC</label>
                      <p className="font-medium">{formatContactName(selectedPartner.governmentBusinessPOC)}</p>
                      {selectedPartner.governmentBusinessPOC.title && (
                        <p className="text-sm text-gray-500">{selectedPartner.governmentBusinessPOC.title}</p>
                      )}
                      {selectedPartner.governmentBusinessPOC.email && (
                        <a href={`mailto:${selectedPartner.governmentBusinessPOC.email}`} className="flex items-center gap-1 text-sm text-blue-600 hover:underline mt-1">
                          <Mail className="h-3 w-3" />
                          {selectedPartner.governmentBusinessPOC.email}
                        </a>
                      )}
                      {selectedPartner.governmentBusinessPOC.phone && (
                        <a href={`tel:${selectedPartner.governmentBusinessPOC.phone}`} className="flex items-center gap-1 text-sm text-blue-600 hover:underline mt-1">
                          <Phone className="h-3 w-3" />
                          {selectedPartner.governmentBusinessPOC.phone}
                        </a>
                      )}
                    </div>
                  )}

                  {selectedPartner.electronicBusinessPOC && formatContactName(selectedPartner.electronicBusinessPOC) && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-xs font-medium text-gray-500 uppercase mb-2 block">Electronic Business POC</label>
                      <p className="font-medium">{formatContactName(selectedPartner.electronicBusinessPOC)}</p>
                      {selectedPartner.electronicBusinessPOC.title && (
                        <p className="text-sm text-gray-500">{selectedPartner.electronicBusinessPOC.title}</p>
                      )}
                      {selectedPartner.electronicBusinessPOC.email && (
                        <a href={`mailto:${selectedPartner.electronicBusinessPOC.email}`} className="flex items-center gap-1 text-sm text-blue-600 hover:underline mt-1">
                          <Mail className="h-3 w-3" />
                          {selectedPartner.electronicBusinessPOC.email}
                        </a>
                      )}
                      {selectedPartner.electronicBusinessPOC.phone && (
                        <a href={`tel:${selectedPartner.electronicBusinessPOC.phone}`} className="flex items-center gap-1 text-sm text-blue-600 hover:underline mt-1">
                          <Phone className="h-3 w-3" />
                          {selectedPartner.electronicBusinessPOC.phone}
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600">
                    <Handshake className="h-4 w-4 mr-2" />
                    Send Teaming Request
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save to List
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
