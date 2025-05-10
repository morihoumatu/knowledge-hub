import { getAllKnowledgeItems } from '@/lib/knowledge';
import ClientHome from '@/components/ClientHome';

export default async function Home() {
  const knowledgeItems = await getAllKnowledgeItems();
  
  return <ClientHome initialKnowledgeItems={knowledgeItems} />;
}