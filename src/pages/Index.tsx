import { useState } from 'react';
import { Snowfall } from '@/components/Snowfall';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    toast({
      title: "Добро пожаловать! 🎉",
      description: "Вы успешно вошли в систему",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
      toast({
        title: "Файлы загружены",
        description: `Добавлено файлов: ${fileNames.length}`,
      });
    }
  };

  const portfolioWorks = [
    { id: 1, title: "Веб-дизайн корпоративного сайта", category: "Дизайн", year: "2024" },
    { id: 2, title: "Мобильное приложение для доставки", category: "Разработка", year: "2024" },
    { id: 3, title: "Брендинг стартапа", category: "Дизайн", year: "2023" },
    { id: 4, title: "E-commerce платформа", category: "Разработка", year: "2023" },
    { id: 5, title: "Логотип и фирменный стиль", category: "Дизайн", year: "2024" },
    { id: 6, title: "CRM система", category: "Разработка", year: "2023" },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <Snowfall />
        
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
        
        <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-card/95 animate-fade-in border-2 border-primary/20">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Icon name="Snowflake" className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Добро пожаловать
            </CardTitle>
            <CardDescription className="text-base">
              Войдите, чтобы увидеть портфолио
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="example@mail.ru"
                  required
                  className="bg-secondary/50 border-primary/30 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  required
                  className="bg-secondary/50 border-primary/30 focus:border-primary"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 transition-all hover:scale-[1.02]">
                <Icon name="LogIn" className="w-4 h-4 mr-2" />
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <Snowfall />
      
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      <div className="relative z-10">
        <header className="border-b border-primary/20 backdrop-blur-sm bg-card/50 sticky top-0 z-20">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Icon name="Snowflake" className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">Портфолио</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsLoggedIn(false)}
              className="border-primary/30 hover:bg-primary/10"
            >
              <Icon name="LogOut" className="w-4 h-4 mr-2" />
              Выйти
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto space-y-12">
            <section className="text-center space-y-4 animate-slide-up">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Мои работы
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Коллекция проектов в области дизайна и разработки
              </p>
            </section>

            <Tabs defaultValue="all" className="w-full animate-fade-in">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-secondary/50">
                <TabsTrigger value="all">Все работы</TabsTrigger>
                <TabsTrigger value="design">Дизайн</TabsTrigger>
                <TabsTrigger value="dev">Разработка</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioWorks.map((work, idx) => (
                    <Card 
                      key={work.id} 
                      className="group hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] bg-card/80 backdrop-blur-sm animate-fade-in"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon 
                              name={work.category === "Дизайн" ? "Palette" : "Code"} 
                              className="w-6 h-6 text-primary"
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{work.year}</span>
                        </div>
                        <CardTitle className="text-lg mt-4">{work.title}</CardTitle>
                        <CardDescription>{work.category}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="design" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioWorks.filter(w => w.category === "Дизайн").map((work, idx) => (
                    <Card 
                      key={work.id} 
                      className="group hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] bg-card/80 backdrop-blur-sm animate-fade-in"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon name="Palette" className="w-6 h-6 text-primary" />
                          </div>
                          <span className="text-xs text-muted-foreground">{work.year}</span>
                        </div>
                        <CardTitle className="text-lg mt-4">{work.title}</CardTitle>
                        <CardDescription>{work.category}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="dev" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioWorks.filter(w => w.category === "Разработка").map((work, idx) => (
                    <Card 
                      key={work.id} 
                      className="group hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] bg-card/80 backdrop-blur-sm animate-fade-in"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon name="Code" className="w-6 h-6 text-primary" />
                          </div>
                          <span className="text-xs text-muted-foreground">{work.year}</span>
                        </div>
                        <CardTitle className="text-lg mt-4">{work.title}</CardTitle>
                        <CardDescription>{work.category}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <section className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Card className="border-2 border-primary/20 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name="Upload" className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Загрузка файлов</CardTitle>
                      <CardDescription>Добавьте свои работы в портфолио</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <Input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Label 
                      htmlFor="file-upload" 
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Icon name="FileUp" className="w-12 h-12 text-primary/50" />
                      <span className="text-sm text-muted-foreground">
                        Нажмите, чтобы выбрать файлы
                      </span>
                    </Label>
                  </div>
                  
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Icon name="CheckCircle" className="w-4 h-4 text-primary" />
                        Загруженные файлы:
                      </h4>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg animate-fade-in"
                          >
                            <Icon name="File" className="w-4 h-4 text-primary" />
                            <span className="text-sm">{file}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          </div>
        </main>

        <footer className="border-t border-primary/20 backdrop-blur-sm bg-card/50 mt-20">
          <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              <Icon name="Snowflake" className="w-4 h-4 text-primary" />
              Сделано с любовью в 2024
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
