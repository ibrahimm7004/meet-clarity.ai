import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Chrome, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadExtensionZip } from "@/utils/downloadExtensionZip";
import { useState } from "react";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DownloadModal = ({ isOpen, onClose }: DownloadModalProps) => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadExtension = async () => {
    setIsDownloading(true);
    try {
      await downloadExtensionZip();
      toast({
        title: "Extension Downloaded!",
        description: "Unzip the file, then load it in Chrome: chrome://extensions → Developer mode → Load unpacked",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Some extension files are missing. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadInstructions = () => {
    const instructions = `Clarity Chrome Extension - Quick Install

IMPORTANT: Chrome Web Store version coming soon! For now, follow these steps:

1. The extension is currently in development mode
2. To install, you'll need the extension files (available after Chrome Web Store approval)
3. For early access, contact us at support@clarity-interview.app

Features included:
✓ Real-time AI answers (0.3s response time)
✓ Smart note-taking with auto-categorization
✓ Follow-up email generation
✓ Performance insights and scoring
✓ Works with Zoom, Google Meet, Teams

Keyboard shortcut: Cmd+Shift+C (Mac) or Ctrl+Shift+C (Windows)

Stay tuned for our Chrome Web Store launch!`;

    const blob = new Blob([instructions], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'clarity-extension-instructions.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Instructions Downloaded",
      description: "Extension will be available on Chrome Web Store soon!",
    });
  };

  const steps = [
    {
      number: "1",
      title: "Download the Extension",
      description: "Click the button below to download the developer build as a .zip file"
    },
    {
      number: "2",
      title: "Unzip the File",
      description: "Extract the downloaded .zip file to a folder on your computer"
    },
    {
      number: "3",
      title: "Load in Chrome",
      description: "Open chrome://extensions → Enable 'Developer mode' → Click 'Load unpacked' → Select the extracted folder"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Chrome className="w-6 h-6 text-primary" />
            Install Clarity Extension
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Download Section */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 text-center border-2 border-primary/20">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Chrome className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Download Developer Build
            </h3>
            <p className="text-muted-foreground mb-4">
              Get the extension now and install it manually in Chrome. Chrome Web Store version coming soon!
            </p>
            <div className="bg-primary/10 rounded-lg p-4 mb-6 text-left">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="text-primary">✨</span> Powered by Clarity AI
              </h4>
              <ul className="text-sm text-foreground/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Real-Time AI Answers</strong> - Get instant responses in 0.3s during interviews</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Smart Note-Taking</strong> - Auto-categorized transcription and organization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Follow-Up Emails</strong> - AI-generated professional messages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Performance Reports</strong> - Detailed interview insights and scoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Zero Distraction Design</strong> - Translucent overlay stays out of your way</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <Button
                onClick={handleDownloadExtension}
                disabled={isDownloading}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
              >
                <Download className="w-5 h-5 mr-2" />
                {isDownloading ? "Preparing Download..." : "Download Extension (.zip)"}
              </Button>
              <Button
                onClick={handleDownloadInstructions}
                variant="outline"
                size="lg"
                className="w-full rounded-full"
              >
                <FileText className="w-5 h-5 mr-2" />
                Download Installation Guide
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-full"
                onClick={() => {
                  const email = "support@clarity-interview.app";
                  const subject = "Early Access Request - Clarity Extension";
                  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
                }}
              >
                Request Early Access
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Use Chrome, Brave, or Edge on Mac/Windows/Linux (Safari not supported)
            </p>
          </div>

          {/* Installation Steps */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Installation Steps</h3>
            <div className="grid gap-3">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-3 p-4 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Preview */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-primary/20 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3">✨ Extension Features</h4>
            <ul className="text-sm text-foreground/80 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary">⚡</span>
                <span><strong>0.3s AI Responses</strong> - Get instant answers during interviews</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">📝</span>
                <span><strong>Smart Notes</strong> - Auto-categorized transcription and organization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✉️</span>
                <span><strong>Follow-up Emails</strong> - AI-generated professional messages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">📊</span>
                <span><strong>Performance Insights</strong> - Real-time scoring and feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">⌨️</span>
                <span><strong>Keyboard Shortcut</strong> - Cmd+Shift+C (Mac) or Ctrl+Shift+C (Windows)</span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Questions? <a href="#contact" className="text-primary hover:underline font-medium">Contact Support</a></p>
            <p className="mt-1">🚀 Chrome Web Store approval typically takes 1-2 weeks</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadModal;
