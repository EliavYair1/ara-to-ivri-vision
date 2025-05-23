
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

export default function SearchSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<DictionaryEntry[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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
      <h2 className="text-2xl font-bold mb-6 hebrew-text">מילון ארמי-עברי</h2>
      
      <div className="flex flex-col space-y-6">
        <div className="flex space-x-4 rtl:space-x-reverse">
          <div className="flex-1">
            <Input
              dir="rtl"
              className="hebrew-text"
              placeholder="חפש מילה בארמית או בעברית..."
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
          >
            {isSearching ? (
              <span className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            <span className="sr-only">חפש</span>
          </Button>
        </div>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {searchResults.map((result, index) => (
              <Card key={index} className="paper-effect animate-scroll-reveal">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="aramaic-text text-xl font-bold">
                        {result.aramaic}
                      </CardTitle>
                      <CardDescription className="hebrew-text mt-1">
                        {result.hebrew}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="hebrew-text">
                    <p className="font-medium mb-2">הגדרה:</p>
                    <p className="text-muted-foreground mb-4">{result.definition}</p>
                    
                    {result.examples && result.examples.length > 0 && (
                      <>
                        <p className="font-medium mb-2">דוגמאות:</p>
                        <ScrollArea className="h-24 rounded-md border p-2">
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
          <div className="text-center p-10 hebrew-text">
            <p className="text-muted-foreground">לא נמצאו תוצאות עבור "{searchTerm}"</p>
          </div>
        ) : null}

        {!searchTerm && !searchResults.length && (
          <div className="text-center p-10">
            <p className="text-muted-foreground hebrew-text">
              חפש מילה בארמית או בעברית כדי לקבל את פירושה והגדרתה
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
