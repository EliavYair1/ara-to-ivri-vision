
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightLeft, Copy, RotateCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { dictionary } from "@/data/dictionary";
import { useToast } from "@/components/ui/use-toast";

export default function TranslationSection() {
  const [aramaic, setAramaic] = useState("");
  const [translation, setTranslation] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

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
      title: "הועתק!",
      description: "התרגום הועתק ללוח",
    });
  };

  const clearText = () => {
    setAramaic("");
    setTranslation("");
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 hebrew-text">מתרגם ארמית לעברית</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="paper-effect">
            <CardContent className="pt-6">
              <Textarea
                dir="rtl"
                className="aramaic-text resize-none h-48 bg-transparent border-none text-lg focus-visible:ring-0"
                placeholder="הכנס טקסט בארמית כאן..."
                value={aramaic}
                onChange={(e) => setAramaic(e.target.value)}
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={clearText}>
              <RotateCw className="mr-2 h-4 w-4" />
              נקה
            </Button>
            <Button 
              onClick={translateText} 
              disabled={!aramaic.trim() || isTranslating}
            >
              {isTranslating ? (
                <span className="flex items-center">
                  <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                  מתרגם...
                </span>
              ) : (
                <span className="flex items-center">
                  <ArrowRightLeft className="mr-2 h-4 w-4" />
                  תרגם
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="paper-effect">
            <CardContent className="pt-6">
              <div 
                className="hebrew-text h-48 overflow-y-auto text-lg"
                dir="rtl"
              >
                {translation ? translation : (
                  <span className="text-muted-foreground">התרגום יופיע כאן...</span>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={copyToClipboard}
              disabled={!translation}
            >
              <Copy className="mr-2 h-4 w-4" />
              העתק
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-10 p-4 bg-muted rounded-lg text-sm hebrew-text">
        <p className="font-medium mb-2">טיפ:</p>
        <p>המתרגם האוטומטי מזהה ומתרגם מילים וביטויים נפוצים בתלמוד. לתוצאות מדויקות יותר, נסה לחפש מילים בודדות במילון.</p>
      </div>
    </div>
  );
}
