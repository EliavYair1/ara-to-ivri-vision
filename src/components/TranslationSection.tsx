
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightLeft, Copy, RotateCw, Camera, Upload, Share2 } from "lucide-react";
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
  DialogClose 
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function TranslationSection() {
  const [aramaic, setAramaic] = useState("");
  const [translation, setTranslation] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { toast } = useToast();
  const { language, direction } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Translation labels based on language
  const labels = {
    title: language === "hebrew" ? "מתרגם ארמית לעברית" : "Aramaic to Hebrew Translator",
    inputPlaceholder: language === "hebrew" ? "הכנס טקסט בארמית כאן..." : "Enter Aramaic text here...",
    outputPlaceholder: language === "hebrew" ? "התרגום יופיע כאן..." : "Translation will appear here...",
    translate: language === "hebrew" ? "תרגם" : "Translate",
    translating: language === "hebrew" ? "מתרגם..." : "Translating...",
    clear: language === "hebrew" ? "נקה" : "Clear",
    copy: language === "hebrew" ? "העתק" : "Copy",
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
    upload: language === "hebrew" ? "העלה" : "Upload"
  };

  // Simple translation function based on our dictionary
  const translateText = () => {
    if (!aramaic.trim()) return;
    
    setIsTranslating(true);
    
    // Simulate API delay
    setTimeout(() => {
      let translatedText = aramaic;
      
      // Simple word replacement based on our dictionary
      dictionary.forEach(entry => {
        const regex = new RegExp(`\\b${entry.aramaic}\\b`, 'g');
        translatedText = translatedText.replace(regex, entry.hebrew);
      });
      
      setTranslation(translatedText);
      setIsTranslating(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translation);
    toast({
      title: language === "hebrew" ? "הועתק!" : "Copied!",
      description: language === "hebrew" ? "התרגום הועתק ללוח" : "Translation copied to clipboard",
    });
  };

  const clearText = () => {
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
    setTimeout(() => {
      const sampleAramaicText = "אמר רבא הני מילי";
      setAramaic(sampleAramaicText);
      setIsTranslating(false);
      
      // Auto translate after OCR is complete
      setTimeout(() => {
        translateText();
      }, 500);
    }, 2000);
  };

  const handleShare = async () => {
    if (!translation) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: language === "hebrew" ? "תרגום ארמית לעברית" : "Aramaic to Hebrew Translation",
          text: `${aramaic}\n\n${translation}`,
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

  return (
    <div className="animate-fade-in">
      <h2 className={`text-2xl font-bold mb-6 ${language === "hebrew" ? "hebrew-text" : "text-left"}`}>
        {labels.title}
      </h2>
      
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
                dir="rtl"
                className="aramaic-text resize-none h-48 bg-transparent border-none text-lg focus-visible:ring-0"
                placeholder={labels.inputPlaceholder}
                value={aramaic}
                onChange={(e) => setAramaic(e.target.value)}
                readOnly={isTranslating}
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={clearText} className="hover:bg-destructive/10">
              <RotateCw className="mr-2 h-4 w-4" />
              {labels.clear}
            </Button>
            <Button 
              onClick={translateText} 
              disabled={!aramaic.trim() || isTranslating}
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
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
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
              >
                <Upload className="mr-2 h-4 w-4" />
                {labels.uploadImage}
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleShare}
                disabled={!translation}
              >
                <Share2 className="mr-2 h-4 w-4" />
                {labels.shareTranslation}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={copyToClipboard}
                disabled={!translation}
              >
                <Copy className="mr-2 h-4 w-4" />
                {labels.copy}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`mt-10 p-4 bg-primary/5 rounded-lg text-sm ${language === "hebrew" ? "hebrew-text" : "text-left"}`}>
        <p className="font-medium mb-2">{labels.tip}</p>
        <p>{labels.tipText}</p>
      </div>
    </div>
  );
}
