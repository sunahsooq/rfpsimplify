import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Send, Paperclip, Mail, CheckCircle, Clock, 
  MessageSquare, FileText, Phone, Lightbulb, User, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AppTopNav } from "@/components/AppTopNav";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderInitials: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  read: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "partner",
    senderName: "CyberShield Solutions",
    senderInitials: "CS",
    content: "Hi! Thanks for reaching out about the CISA opportunity. We've reviewed the requirements and believe our FedRAMP High authorization would complement your capabilities well.",
    timestamp: "10:30 AM",
    isOwn: false,
    read: true,
  },
  {
    id: "2",
    senderId: "user",
    senderName: "TechGov Solutions",
    senderInitials: "TG",
    content: "Thanks for your interest! We think your FedRAMP High and cloud migration experience would be a perfect fit. Would you be open to a call this week to discuss the teaming structure?",
    timestamp: "10:45 AM",
    isOwn: true,
    read: true,
  },
  {
    id: "3",
    senderId: "partner",
    senderName: "CyberShield Solutions",
    senderInitials: "CS",
    content: "Absolutely! We're available Thursday afternoon or Friday morning. Also, I can share some relevant past performance references from our recent DHS work.",
    timestamp: "11:15 AM",
    isOwn: false,
    read: true,
  },
  {
    id: "4",
    senderId: "user",
    senderName: "TechGov Solutions",
    senderInitials: "TG",
    content: "Friday morning works great. Let's say 10 AM ET? I'll send a calendar invite. Looking forward to discussing the workshare split and your proposed team structure.",
    timestamp: "11:30 AM",
    isOwn: true,
    read: true,
  },
];

const quickResponses = [
  "Can you share your relevant past performance?",
  "What's your proposed team structure?",
  "Are you available for a call this week?",
  "What's your pricing approach?",
];

export default function PartnerConversation() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const partner = {
    name: "CyberShield Solutions",
    initials: "CS",
    location: "Reston, VA",
    verified: true,
    certifications: ["FedRAMP High", "CMMC L2", "ISO 27001"],
  };

  const opportunity = {
    title: "Cloud Infrastructure Modernization Services",
    agency: "Department of Energy",
    solicitationId: "DE-SOL-0012847",
    dueDate: "Feb 15, 2026",
    matchScore: 87,
  };

  const timeline = [
    { label: "Request Sent", date: "Jan 15", status: "completed" },
    { label: "Viewed", date: "Jan 16", status: "completed" },
    { label: "Discussion Started", date: "Jan 17", status: "completed" },
    { label: "Decision", date: "Pending", status: "current" },
  ];

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      senderId: "user",
      senderName: "TechGov Solutions",
      senderInitials: "TG",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      isOwn: true,
      read: false,
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <AppTopNav />

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Back Link */}
        <button
          onClick={() => navigate("/partner-requests")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Partner Requests
        </button>

        {/* Three Column Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Context */}
          <div className="col-span-3 space-y-4">
            {/* Partner Profile Card */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-5">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded-xl flex items-center justify-center text-white font-bold text-xl mb-3">
                    {partner.initials}
                  </div>
                  <h3 className="font-bold text-slate-900">{partner.name}</h3>
                  <p className="text-sm text-slate-500">{partner.location}</p>
                  {partner.verified && (
                    <Badge className="mt-2 bg-green-100 text-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" /> Verified
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                  {partner.certifications.map((cert, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <User className="h-4 w-4 mr-2" /> View Full Profile
                </Button>
              </CardContent>
            </Card>

            {/* Opportunity Context Card */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-5">
                <h4 className="font-semibold text-slate-900 mb-2">{opportunity.title}</h4>
                <p className="text-sm text-slate-500 mb-3">
                  {opportunity.agency} • {opportunity.solicitationId}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-600">Due: {opportunity.dueDate}</span>
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {opportunity.matchScore}%
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Request Timeline */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-700">Request Timeline</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {timeline.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                        item.status === "completed" ? "bg-green-500" : 
                        item.status === "current" ? "bg-blue-500 animate-pulse" : "bg-slate-300"
                      }`} />
                      <div className="flex-1">
                        <p className={`text-sm ${item.status === "current" ? "font-medium text-blue-700" : "text-slate-600"}`}>
                          {item.label}
                        </p>
                        <p className="text-xs text-slate-400">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Conversation */}
          <div className="col-span-6">
            <Card className="border-0 shadow-lg h-[calc(100vh-180px)] flex flex-col">
              {/* Header */}
              <CardHeader className="border-b bg-slate-50 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Conversation ({messages.length} messages)
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4 mr-1" /> Attachments (3)
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-1" /> Email Summary
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="text-center">
                  <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    January 17, 2026
                  </span>
                </div>

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[70%] ${message.isOwn ? "order-2" : ""}`}>
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.isOwn
                            ? "bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white"
                            : "bg-white border shadow-sm"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div className={`flex items-center gap-1 mt-1 ${message.isOwn ? "justify-end" : ""}`}>
                        <span className="text-xs text-slate-400">{message.timestamp}</span>
                        {message.isOwn && message.read && (
                          <span className="text-xs text-blue-500">✓✓ Read</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Compose Area */}
              <div className="border-t p-4 bg-white rounded-b-xl">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  />
                  <Button onClick={handleSend} className="bg-gradient-to-r from-[#1e40af] to-[#3b82f6]">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Actions */}
          <div className="col-span-3 space-y-4">
            {/* Decision Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-700">Ready to Decide?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600">
                  <CheckCircle className="h-4 w-4 mr-2" /> Accept as Partner
                </Button>
                <Button className="w-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] hover:from-[#d97706] hover:to-[#f59e0b] text-white">
                  <FileText className="h-4 w-4 mr-2" /> Share Bid Brief
                </Button>
                <button className="w-full text-center text-red-600 hover:text-red-700 text-sm">
                  Cancel Request
                </button>
                <div className="border-t pt-3 mt-3">
                  <p className="text-xs text-slate-500 text-center">Or continue discussing...</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Responses */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-700">Quick Responses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickResponses.map((response, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs text-left h-auto py-2"
                    onClick={() => setNewMessage(response)}
                  >
                    {response}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-0 shadow-lg bg-blue-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Tips for Productive Discussions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-blue-700">
                <p>• Be specific about roles and responsibilities</p>
                <p>• Share relevant past performance early</p>
                <p>• Discuss workshare expectations upfront</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
