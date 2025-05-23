import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightLeft, Copy, RotateCw, Camera, Upload, Share2, MessageSquareText, SwitchCamera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { dictionary } from "@/data/dictionary";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/context/AppContext";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription 
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import NotesSection from "./NotesSection";

export default function TranslationSection() {
  const [aramaic, setAramaic] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [translation, setTranslation] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const { toast } = useToast();
  const { language, direction, translationDirection, setTranslationDirection } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Translation labels based on language
  const labels = {
    titleAramic: language === "hebrew" 
      ? "מתרגם ארמית ל" + (language === "hebrew" ? "עברית" : "אנגלית")
      : "Aramaic to " + (language === "hebrew" ? "Hebrew" : "English") + " Translator",
    titleSecond: language === "hebrew" 
      ? (language === "hebrew" ? "עברית" : "אנגלית") + " לארמית"
      : (language === "hebrew" ? "Hebrew" : "English") + " to Aramaic",
    inputAramaic: language === "hebrew" 
      ? "הכנס טקסט בארמית כאן..." 
      : "Enter Aramaic text here...",
    inputSecond: language === "hebrew" 
      ? "הכנס טקסט ב" + (language === "hebrew" ? "עברית" : "אנגלית") + " כאן..." 
      : "Enter " + (language === "hebrew" ? "Hebrew" : "English") + " text here...",
    outputPlaceholder: language === "hebrew" 
      ? "התרגום יופיע כאן..." 
      : "Translation will appear here...",
    translate: language === "hebrew" ? "תרגם" : "Translate",
    translating: language === "hebrew" ? "מתרגם..." : "Translating...",
    clear: language === "hebrew" ? "נקה" : "Clear",
    copy: language === "hebrew" ? "העתק" : "Copy",
    switchDirection: language === "hebrew" ? "החלף כיוון" : "Switch Direction",
    tip: language === "hebrew" ? "טיפ:" : "Tip:",
    tipText: language === "hebrew" 
      ? "המתרגם האוטומטי מזהה ומתרגם מילים וביטויים נפוצים בתלמוד. לתוצאות מדויקות יותר, נסה לחפש מילים בודדות במילון."
      : "The automatic translator identifies and translates common Talmudic words and phrases. For more accurate results, try looking up individual words in the dictionary.",
    uploadImage: language === "hebrew" ? "העלה תמונה" : "Upload Image",
    takePhoto: language === "hebrew" ? "צלם תמונה" : "Take Photo",
    shareTranslation: language === "hebrew" ? "שתף תרגום" : "Share Translation",
    processingImage: language === "hebrew" ? "מעבד תמונה..." : "Processing image...",
    capturePhoto: language === "hebrew" ? "צלם תמונה" : "Capture Photo",
    photoUpload: language === "hebrew" ? "העלאת תמונה" : "Photo Upload",
    cancel: language === "hebrew" ? "ביטול" : "Cancel",
    upload: language === "hebrew" ? "העלה" : "Upload",
    aiAssist: language === "hebrew" ? "סיוע בינה מלאכותית" : "AI Assistance",
    aramaic: language === "hebrew" ? "טקסט ארמית" : "Aramaic Text",
    aiModalTitle: language === "hebrew" ? "עזרה מבינה מלאכותית" : "AI Help",
    aiModalDesc: language === "hebrew" ? "כאשר התרגום הרגיל אינו זמין, הבינה המלאכותית יכולה לעזור" : "When regular translation is unavailable, AI can help"
  };

  // Get the title based on translation direction
  const getTitle = () => {
    if (translationDirection === "aramic-to-second") {
      return labels.titleAramic;
    } else {
      return labels.titleSecond;
    }
  };

  // Get the input placeholder based on translation direction
  const getInputPlaceholder = () => {
    if (translationDirection === "aramic-to-second") {
      return labels.inputAramaic;
    } else {
      return labels.inputSecond;
    }
  };

  // Switch translation direction
  const handleSwitchDirection = () => {
    const newDirection = translationDirection === "aramic-to-second" 
      ? "second-to-aramic" 
      : "aramic-to-second";
    
    setTranslationDirection(newDirection);
    clearText();
  };

  // Translation function
  const translateText = () => {
    if (!sourceText.trim()) return;
    
    setIsTranslating(true);
    
    // Simulate API delay
    setTimeout(() => {
      // INTEGRATION POINT: API Connection for translation
      // You can replace this code with actual API call to your translation service
      // Example:
      // const translationResult = await fetchTranslation(sourceText, translationDirection);
      // setAramaic(translationResult.aramaic);
      // setTranslation(translationResult.translation);

      if (translationDirection === "aramic-to-second") {
        // Aramaic to Second language
        setAramaic(sourceText); // Keep aramaic as is
        
        // Simulate translation
        let translatedText = sourceText;
        dictionary.forEach(entry => {
          const regex = new RegExp(`\\b${entry.aramaic}\\b`, 'g');
          translatedText = translatedText.replace(regex, entry.hebrew);
        });
        
        setTranslation(translatedText);
      } else {
        // Second language to Aramaic
        let translatedAramaic = "";
        
        // Simulate translation to Aramaic
        dictionary.forEach(entry => {
          if (sourceText.toLowerCase().includes(entry.hebrew.toLowerCase())) {
            translatedAramaic += entry.aramaic + " ";
          }
        });
        
        if (!translatedAramaic.trim()) {
          translatedAramaic = "אמר רבא הני מילי"; // Default text if no matches
        }
        
        setAramaic(translatedAramaic);
        setTranslation(sourceText); // Original text is the translation
      }
      
      setIsTranslating(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    const textToCopy = translationDirection === "aramic-to-second" ? translation : aramaic;
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: language === "hebrew" ? "הועתק!" : "Copied!",
      description: language === "hebrew" ? "התרגום הועתק ללוח" : "Translation copied to clipboard",
    });
  };

  const copyAramaicToClipboard = () => {
    const textToCopy = translationDirection === "aramic-to-second" ? aramaic : translation;
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: language === "hebrew" ? "הועתק!" : "Copied!",
      description: language === "hebrew" ? "טקסט ארמית הועתק ללוח" : "Aramaic text copied to clipboard",
    });
  };

  const clearText = () => {
    setSourceText("");
    setAramaic("");
    setTranslation("");
    setCapturedImage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setCapturedImage(imageUrl);
        // Simulate OCR processing
        simulateOcrProcessing();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateOcrProcessing = () => {
    setIsTranslating(true);
    toast({
      title: language === "hebrew" ? "מעבד תמונה..." : "Processing image...",
      description: language === "hebrew" ? "מזהה טקסט בתמונה" : "Extracting text from image",
    });
    
    // Simulate OCR delay and result
    // INTEGRATION POINT: OCR Service Connection
    // Replace with actual OCR API call to your service
    // Example: 
    // const textFromImage = await ocrService.extractText(imageData);
    // setAramaic(textFromImage);
    
    setTimeout(() => {
      const sampleAramaicText = "אמר רבא הני מילי";
      
      if (translationDirection === "aramic-to-second") {
        setSourceText(sampleAramaicText);
      } else {
        setSourceText(language === "hebrew" ? "אמר החכם דברים אלה" : "The sage said these things");
      }
      
      setIsTranslating(false);
      
      // Auto translate after OCR is complete
      setTimeout(() => {
        translateText();
      }, 500);
    }, 2000);
  };

  const handleShare = async () => {
    const textToShare = translationDirection === "aramic-to-second" ? 
      `${aramaic}\n\n${translation}` : 
      `${translation}\n\n${aramaic}`;
    
    if (!textToShare.trim()) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: language === "hebrew" ? "תרגום ארמית" : "Aramaic Translation",
          text: textToShare,
        });
      } else {
        copyToClipboard();
        toast({
          title: language === "hebrew" ? "הועתק!" : "Copied!",
          description: language === "hebrew" ? "התרגום הועתק. אין אפשרות שיתוף ישיר במכשיר זה." : 
            "Translation copied. Direct sharing not available on this device.",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleAiAssist = () => {
    // INTEGRATION POINT: AI Backend Connection
    // This would connect to your server with GPT implementation
    setShowAiModal(true);
    
    if (!translation && aramaic) {
      // Simulate AI generating a translation when dictionary fails
      setTimeout(() => {
        setTranslation(language === "hebrew" 
          ? "תרגום מבוסס בינה מלאכותית: הרב אמר דברים אלו" 
          : "AI-based translation: The rabbi said these things");
      }, 1500);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${language === "hebrew" ? "hebrew-text" : "text-left"}`}>
          {getTitle()}
        </h2>
        <Button 
          variant="outline" 
          onClick={handleSwitchDirection} 
          className="flex items-center gap-2"
        >
          <SwitchCamera className="h-4 w-4" />
          <span>{labels.switchDirection}</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="paper-effect shadow-lg border-primary/20 hover:shadow-xl transition-all">
            <CardContent className="pt-6">
              {capturedImage && (
                <div className="mb-4">
                  <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
                    <img
                      src={capturedImage}
                      alt="Captured"
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                </div>
              )}
              <Textarea
                dir={direction}
                className={`${language === "hebrew" ? "hebrew-text" : ""} resize-none h-28 bg-transparent border-none text-lg focus-visible:ring-0`}
                placeholder={getInputPlaceholder()}
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                readOnly={isTranslating}
              />
              
              {aramaic && translationDirection === "second-to-aramic" && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className={`text-sm font-medium ${language === "hebrew" ? "hebrew-text" : "text-left"}`}>
                      {labels.aramaic}
                    </h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={copyAramaicToClipboard}
                      className="h-8"
                    >
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      <span className="text-xs">{labels.copy}</span>
                    </Button>
                  </div>
                  <div className="bg-secondary/20 p-3 rounded-md aramaic-text text-sm">
                    {aramaic}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={clearText} className="hover:bg-destructive/10">
              <RotateCw className="mr-2 h-4 w-4" />
              {labels.clear}
            </Button>
            <Button 
              onClick={translateText} 
              disabled={!sourceText.trim() || isTranslating}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              {isTranslating ? (
                <span className="flex items-center">
                  <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                  {labels.translating}
                </span>
              ) : (
                <span className="flex items-center">
                  <ArrowRightLeft className="mr-2 h-4 w-4" />
                  {labels.translate}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="paper-effect shadow-lg border-primary/20 hover:shadow-xl transition-all">
            <CardContent className="pt-6">
              <div 
                className={`${language === "hebrew" ? "hebrew-text" : "text-left"} h-48 overflow-y-auto text-lg`}
                dir={direction}
              >
                {translation ? translation : (
                  <span className="text-muted-foreground">{labels.outputPlaceholder}</span>
                )}
              </div>
              
              {aramaic && translationDirection === "aramic-to-second" && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className={`text-sm font-medium ${language === "hebrew" ? "hebrew-text" : "text-left"}`}>
                      {labels.aramaic}
                    </h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={copyAramaicToClipboard}
                      className="h-8"
                    >
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      <span className="text-xs">{labels.copy}</span>
                    </Button>
                  </div>
                  <div className="bg-secondary/20 p-3 rounded-md aramaic-text text-sm">
                    {aramaic}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-between flex-wrap gap-2">
            <div className="flex gap-2 flex-wrap">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="whitespace-nowrap">
                    <Camera className="mr-2 h-4 w-4" />
                    {labels.takePhoto}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{labels.capturePhoto}</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="bg-muted h-64 w-full rounded-md flex items-center justify-center">
                      <Camera className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <DialogFooter className="w-full">
                      <DialogClose asChild>
                        <Button variant="outline">{labels.cancel}</Button>
                      </DialogClose>
                      <Button 
                        onClick={() => {
                          if (fileInputRef.current) {
                            fileInputRef.current.click();
                          }
                        }}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {labels.upload}
                      </Button>
                    </DialogFooter>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="outline"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}
                className="whitespace-nowrap"
              >
                <Upload className="mr-2 h-4 w-4" />
                {labels.uploadImage}
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleAiAssist}
                className="whitespace-nowrap"
              >
                <MessageSquareText className="mr-2 h-4 w-4" />
                {labels.aiAssist}
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleShare}
                disabled={!translation}
                className="whitespace-nowrap"
              >
                <Share2 className="mr-2 h-4 w-4" />
                {labels.shareTranslation}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={copyToClipboard}
                disabled={!translation}
                className="whitespace-nowrap"
              >
                <Copy className="mr-2 h-4 w-4" />
                {labels.copy}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showAiModal} onOpenChange={setShowAiModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className={language === "hebrew" ? "hebrew-text" : ""}>
              {labels.aiModalTitle}
            </DialogTitle>
            <DialogDescription className={language === "hebrew" ? "hebrew-text" : ""}>
              {labels.aiModalDesc}
            </DialogDescription>
          </DialogHeader>
          <div className={`space-y-4 ${language === "hebrew" ? "hebrew-text" : ""}`} dir={direction}>
            <div className="bg-muted/30 p-4 rounded-md">
              <p className="text-sm">
                {language === "hebrew" 
                  ? "שירות זה מבוסס על מנוע AI שפועל בשרת. כאשר התרגום הרגיל נתקל בבעיה, המערכת תשתמש ב-AI כדי לספק תרגום." 
                  : "This service uses a server-based AI engine. When regular translation encounters issues, the system will use AI to provide a translation."}
              </p>
            </div>
            <Input 
              placeholder={language === "hebrew" ? "הקלד שאלה או בקשה..." : "Type a question or request..."}
              dir={direction}
              className={language === "hebrew" ? "hebrew-text" : ""}
            />
            <div className="flex justify-end">
              <Button>
                {language === "hebrew" ? "שלח" : "Send"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className={`mt-10 p-4 bg-primary/5 rounded-lg text-sm ${language === "hebrew" ? "hebrew-text" : "text-left"}`}>
        <p className="font-medium mb-2">{labels.tip}</p>
        <p>{labels.tipText}</p>
      </div>

      {/* Notes Section */}
      <NotesSection />
    </div>
  );
}
