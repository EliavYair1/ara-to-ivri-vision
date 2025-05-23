
import { useState } from "react";
import Layout from "@/components/Layout";
import TranslationSection from "@/components/TranslationSection";
import SearchSection from "@/components/SearchSection";
import { Book, Search, ImagePlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <Tabs defaultValue="translation" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="translation" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span className="hebrew-text">תרגום</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="hebrew-text">חיפוש</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2" disabled>
              <ImagePlus className="h-4 w-4" />
              <span className="hebrew-text">תרגום תמונה</span>
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
              <p className="hebrew-text text-muted-foreground">
                תכונה זו תהיה זמינה בקרוב
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;
