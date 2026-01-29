import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, Users, X } from "lucide-react";
import { toast } from "sonner";

interface Partner {
  id: number;
  name: string;
  initials: string;
}

interface EmailOutreachModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPartners: Partner[];
  onClearSelection?: () => void;
}

const emailTemplates = {
  teaming: {
    name: "Teaming Interest",
    subject: "Teaming Opportunity - {{opportunity_title}}",
    body: `Dear {{contact_name}},

I hope this message finds you well. My name is [Your Name] from TechGov Solutions, and I'm reaching out regarding a federal contracting opportunity that I believe could be a great fit for a teaming arrangement between our companies.

**Opportunity:** {{opportunity_title}}
**Agency:** Department of Energy
**Due Date:** {{due_date}}
**Set-Aside:** Small Business

Based on your company's capabilities in {{matching_capability}}, I believe {{company_name}} would be an excellent partner for this pursuit. Our analysis shows that together we could address 100% of the requirements.

I'd love to schedule a brief call to discuss this opportunity and explore how we might work together.

Best regards,
[Your Name]
TechGov Solutions`,
  },
  fedramp: {
    name: "FedRAMP Inquiry",
    subject: "FedRAMP Partnership Inquiry - {{company_name}}",
    body: `Dear {{contact_name}},

I'm reaching out from TechGov Solutions regarding a potential FedRAMP partnership opportunity.

We're currently pursuing a federal contract that requires FedRAMP High authorization. Your company's FedRAMP-authorized platform could be a perfect complement to our proposal.

Would you be available for a brief call this week to discuss potential collaboration?

Best regards,
[Your Name]`,
  },
  quickcheck: {
    name: "Quick Check",
    subject: "Quick Question - Federal Teaming",
    body: `Hi {{contact_name}},

Quick question: Is {{company_name}} currently pursuing any DOE cloud opportunities?

We're assembling a team for a significant opportunity and think there could be good synergy.

Let me know if you'd like to connect.

Thanks,
[Your Name]`,
  },
  jv: {
    name: "JV Proposal",
    subject: "Joint Venture Proposal - {{opportunity_title}}",
    body: `Dear {{contact_name}},

TechGov Solutions is exploring the formation of a Joint Venture for an upcoming federal opportunity, and {{company_name}} emerged as an ideal potential partner.

**Why a JV makes sense:**
- Combined capabilities cover 100% of requirements
- Complementary set-aside certifications
- Strong past performance together

I'd welcome the opportunity to discuss this further at your convenience.

Best regards,
[Your Name]`,
  },
};

export function EmailOutreachModal({ 
  open, 
  onOpenChange, 
  selectedPartners,
  onClearSelection 
}: EmailOutreachModalProps) {
  const [activeTemplate, setActiveTemplate] = useState<keyof typeof emailTemplates>("teaming");
  const [subject, setSubject] = useState(emailTemplates.teaming.subject);
  const [body, setBody] = useState(emailTemplates.teaming.body);

  const handleTemplateChange = (template: string) => {
    const key = template as keyof typeof emailTemplates;
    setActiveTemplate(key);
    setSubject(emailTemplates[key].subject);
    setBody(emailTemplates[key].body);
  };

  const handleSend = () => {
    toast.success(`Outreach sent to ${selectedPartners.length} partner${selectedPartners.length > 1 ? 's' : ''}`);
    onClearSelection?.();
    onOpenChange(false);
  };

  const highlightMergeFields = (text: string) => {
    return text.split(/({{[^}]+}})/).map((part, idx) => {
      if (part.match(/{{[^}]+}}/)) {
        return (
          <span key={idx} className="bg-primary/20 text-primary px-1 rounded">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Send className="h-5 w-5 text-primary" />
            Partner Outreach Email
          </DialogTitle>
        </DialogHeader>

        {/* Recipients */}
        <div className="flex flex-wrap items-center gap-2 p-3 bg-secondary/50 rounded-lg">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">To:</span>
          {selectedPartners.map((partner) => (
            <Badge 
              key={partner.id} 
              className="bg-primary/20 text-primary border-0 flex items-center gap-1"
            >
              <span className="h-5 w-5 rounded-full bg-primary/30 flex items-center justify-center text-xs">
                {partner.initials}
              </span>
              {partner.name}
            </Badge>
          ))}
        </div>

        {/* Template Tabs */}
        <Tabs value={activeTemplate} onValueChange={handleTemplateChange}>
          <TabsList className="bg-secondary">
            {Object.entries(emailTemplates).map(([key, template]) => (
              <TabsTrigger 
                key={key} 
                value={key}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {template.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Subject Line */}
        <div className="space-y-2">
          <Label className="text-foreground">Subject</Label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="bg-background border-border"
          />
        </div>

        {/* Email Body */}
        <div className="space-y-2">
          <Label className="text-foreground">Message</Label>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="min-h-[250px] bg-background border-border font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Merge fields like <code className="bg-primary/20 text-primary px-1 rounded">{"{{company_name}}"}</code> will be replaced with partner data
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-border">
            Cancel
          </Button>
          <Button 
            onClick={handleSend}
            className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white hover:from-amber-600 hover:to-yellow-500"
          >
            <Send className="h-4 w-4 mr-2" />
            Send to {selectedPartners.length} Partner{selectedPartners.length > 1 ? 's' : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
