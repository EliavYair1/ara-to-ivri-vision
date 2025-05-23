
import { useState } from "react";
import Layout from "@/components/Layout";
import TranslationSection from "@/components/TranslationSection";
import SearchSection from "@/components/SearchSection";
import { Book, Search, ImagePlus, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/context/AppContext";

const Index = () => {
  const { language } = useApp();
  
  // Labels based on language
  const labels = {
    translation: language === "hebrew" ? "תרגום" : "Translation",
    search: language === "hebrew" ? "חיפוש" : "Search",
    imageTranslation: language === "hebrew" ? "תרגום תמונה" : "Image Translation",
    comingSoon: language === "hebrew" ? "תכונה זו תהיה זמינה בקרוב" : "This feature will be available soon"
  };
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <Tabs defaultValue="translation" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="translation" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span className={language === "hebrew" ? "hebrew-text" : ""}>{labels.translation}</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className={language === "hebrew" ? "hebrew-text" : ""}>{labels.search}</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2" disabled>
              <ImagePlus className="h-4 w-4" />
              <span className={language === "hebrew" ? "hebrew-text" : ""}>{labels.imageTranslation}</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="translation">
            <TranslationSection />
          </TabsContent>
          <TabsContent value="search">
            <SearchSection />
          </TabsContent>
          <TabsContent value="image">
            <div className="text-center p-16">
              <p className={`text-muted-foreground ${language === "hebrew" ? "hebrew-text" : ""}`}>
                {labels.comingSoon}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;
