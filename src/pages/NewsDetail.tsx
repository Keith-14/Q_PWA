import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, ExternalLink, Calendar, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Article {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  image_url: string | null;
  article_url: string;
  source_name: string;
  published_at: string | null;
  author: string | null;
  category: string | null;
}

export const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!id) return;
      const { data } = await supabase
        .from('news_articles')
        .select('id, title, description, content, image_url, article_url, source_name, published_at, author, category')
        .eq('id', id)
        .maybeSingle();
      if (active) {
        setArticle(data as Article | null);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <Layout>
      <div className="px-4 py-6 space-y-4 font-arabic">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="text-primary hover:bg-primary/10 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : !article ? (
          <p className="text-sm text-muted-foreground text-center py-16">Article not found.</p>
        ) : (
          <Card className="glass-dark p-5 space-y-4">
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-56 object-cover rounded-xl border border-primary/15"
                onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
              />
            )}

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-none">
                {article.source_name}
              </Badge>
              {article.category && (
                <Badge variant="outline" className="text-[10px] capitalize">{article.category}</Badge>
              )}
            </div>

            <h1 className="text-xl font-bold text-emerald-gradient leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              {article.author && (
                <span className="flex items-center gap-1"><User className="h-3 w-3" />{article.author}</span>
              )}
              {article.published_at && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(article.published_at).toLocaleString()}
                </span>
              )}
            </div>

            {article.description && (
              <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                {article.description}
              </p>
            )}

            {article.content && (
              <div
                className="text-sm text-foreground/85 leading-relaxed space-y-3 [&_img]:rounded-lg [&_img]:my-3 [&_a]:text-primary [&_a]:underline [&_p]:my-2"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            )}

            <a
              href={article.article_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline pt-2"
            >
              View source <ExternalLink className="h-3 w-3" />
            </a>
          </Card>
        )}
      </div>
    </Layout>
  );
};
