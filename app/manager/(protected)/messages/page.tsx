import { getContactSubmissions } from '@/lib/manager-data'
import { MessagesConsole } from './messages-console'

export default async function ManagerMessagesPage() {
  const messages = await getContactSubmissions()
  return <MessagesConsole initialMessages={messages} />
}
