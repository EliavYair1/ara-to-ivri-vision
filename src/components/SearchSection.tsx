
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { dictionary, DictionaryEntry } from "@/data/dictionary";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useApp } from "@/context/AppContext";
import { Badge } from "@/components/ui/badge";

export default function SearchSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<DictionaryEntry[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { language, direction } = useApp();

  // Labels based on language
  const labels = {
    title: language === "hebrew" ? "מילון ארמי-עברי" : "Aramaic-Hebrew Dictionary",
    searchPlaceholder: language === "hebrew" ? 
      "חפש מילה בארמית או בעברית..." : 
      "Search for a word in Aramaic or Hebrew...",
    noResults: language === "hebrew" ?
      "לא נמצאו תוצאות עבור " : 
      "No results found for ",
    emptyMessage: language === "hebrew" ?
      "חפש מילה בארמית או בעברית כדי לקבל את פירושה והגדרתה" :
      "Search for a word in Aramaic or Hebrew to get its meaning and definition",
    definition: language === "hebrew" ? "הגדרה:" : "Definition:",
    examples: language === "hebrew" ? "דוגמאות:" : "Examples:",
    search: language === "hebrew" ? "חפש" : "Search"
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API delay
    setTimeout(() => {
      const results = dictionary.filter(entry => 
        entry.aramaic.includes(searchTerm) || entry.hebrew.includes(searchTerm)
      );
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  return (
    <div className="animate-fade-in">
      <h2 className={`text-2xl font-bold mb-6 ${language === "hebrew" ? "hebrew-text" : "text-left"}`}>
        {labels.title}
      </h2>
      
      <div className="flex flex-col space-y-6">
        <div className={`flex gap-4 ${direction === "rtl" ? "flex-row" : "flex-row-reverse"}`}>
          <div className="flex-1">
            <Input
              dir={direction}
              className={`${language === "hebrew" ? "hebrew-text" : ""} bg-white dark:bg-gray-900`}
              placeholder={labels.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={!searchTerm.trim() || isSearching}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {isSearching ? (
              <span className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            <span className="sr-only">{labels.search}</span>
          </Button>
        </div>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {searchResults.map((result, index) => (
              <Card key={index} className="paper-effect animate-scroll-reveal border-primary/20 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="aramaic-text text-xl font-bold">
                        {result.aramaic}
                      </CardTitle>
                      <CardDescription className={language === "hebrew" ? "hebrew-text mt-1" : "mt-1"}>
                        {result.hebrew}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {language === "hebrew" ? "ארמית" : "Aramaic"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={language === "hebrew" ? "hebrew-text" : ""} dir={direction}>
                    <p className="font-medium mb-2">{labels.definition}</p>
                    <p className="text-muted-foreground mb-4">{result.definition}</p>
                    
                    {result.examples && result.examples.length > 0 && (
                      <>
                        <p className="font-medium mb-2">{labels.examples}</p>
                        <ScrollArea className="h-24 rounded-md border p-2 bg-muted/30">
                          <ul className="space-y-2">
                            {result.examples.map((example, i) => (
                              <li key={i} className="text-muted-foreground">
                                {example}
                              </li>
                            ))}
                          </ul>
                        </ScrollArea>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : searchTerm && !isSearching ? (
          <div className="text-center p-10 bg-card border rounded-md shadow-sm">
            <p className="text-muted-foreground">
              {labels.noResults} "{searchTerm}"
            </p>
          </div>
        ) : null}

        {!searchTerm && !searchResults.length && (
          <div className="text-center p-10 bg-card border rounded-md shadow-sm">
            <p className={`text-muted-foreground ${language === "hebrew" ? "hebrew-text" : ""}`}>
              {labels.emptyMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
