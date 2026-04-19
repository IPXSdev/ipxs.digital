import { getTransmissionSignups } from '@/lib/manager-data'
import { TransmissionConsole } from './transmission-console'

export default async function ManagerTransmissionPage() {
  const signups = await getTransmissionSignups()
  return <TransmissionConsole initialSignups={signups} />
}
