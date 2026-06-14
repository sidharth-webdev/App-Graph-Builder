import { App, GraphData } from '@/types'  

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const mockApps: App[] = [
  { id: 'app-1', name: 'Payment Service',  description: 'Handles all payment flows',    icon: '💳' },
  { id: 'app-2', name: 'Auth Service',     description: 'User authentication',           icon: '🔐' },
  { id: 'app-3', name: 'Notification Hub', description: 'Email & push notifications',    icon: '🔔' },
]

const mockGraphs: Record<string, GraphData> = {
  'app-1': {
    nodes: [
      { id: 'n1', type: 'serviceNode', position: { x: 80,  y: 160 }, data: { label: 'API Gateway',       description: 'Entry point for all requests', status: 'Healthy',  type: 'service',  sliderValue: 72 } },
      { id: 'n2', type: 'serviceNode', position: { x: 380, y: 80  }, data: { label: 'Payment Processor', description: 'Stripe integration',          status: 'Healthy',  type: 'service',  sliderValue: 45 } },
      { id: 'n3', type: 'serviceNode', position: { x: 380, y: 280 }, data: { label: 'Payments DB',       description: 'PostgreSQL instance',         status: 'Healthy',  type: 'database', sliderValue: 88 } },
      { id: 'n4', type: 'serviceNode', position: { x: 660, y: 160 }, data: { label: 'Ledger Service',    description: 'Transaction records',         status: 'Degraded', type: 'service',  sliderValue: 30 } },
    ],
    edges: [
      { id: 'e1-2', source: 'n1', target: 'n2', animated: true },
      { id: 'e1-3', source: 'n1', target: 'n3' },
      { id: 'e2-4', source: 'n2', target: 'n4', animated: true },
      { id: 'e3-4', source: 'n3', target: 'n4' },
    ],
  },
  'app-2': {
    nodes: [
      { id: 'n1', type: 'serviceNode', position: { x: 80,  y: 200 }, data: { label: 'Auth API',    description: 'JWT issuer',          status: 'Healthy', type: 'service',  sliderValue: 60 } },
      { id: 'n2', type: 'serviceNode', position: { x: 380, y: 100 }, data: { label: 'User Store',  description: 'User credentials DB', status: 'Healthy', type: 'database', sliderValue: 55 } },
      { id: 'n3', type: 'serviceNode', position: { x: 380, y: 300 }, data: { label: 'Token Cache', description: 'Redis cache',         status: 'Down',    type: 'database', sliderValue: 0  } },
    ],
    edges: [
      { id: 'e1-2', source: 'n1', target: 'n2', animated: true },
      { id: 'e1-3', source: 'n1', target: 'n3' },
    ],
  },
  'app-3': {
    nodes: [
      { id: 'n1', type: 'serviceNode', position: { x: 100, y: 180 }, data: { label: 'Notification API', description: 'Dispatch endpoint',    status: 'Healthy',  type: 'service', sliderValue: 50 } },
      { id: 'n2', type: 'serviceNode', position: { x: 400, y: 100 }, data: { label: 'Email Worker',     description: 'SendGrid integration', status: 'Healthy',  type: 'service', sliderValue: 40 } },
      { id: 'n3', type: 'serviceNode', position: { x: 400, y: 280 }, data: { label: 'Push Worker',      description: 'FCM integration',      status: 'Degraded', type: 'service', sliderValue: 20 } },
    ],
    edges: [
      { id: 'e1-2', source: 'n1', target: 'n2', animated: true },
      { id: 'e1-3', source: 'n1', target: 'n3', animated: true },
    ],
  },
}

let simulateError = false
export const toggleSimulateError = () => { simulateError = !simulateError }
export const getSimulateError = () => simulateError

export async function fetchApps(): Promise<App[]> {
  await delay(600)
  if (simulateError) throw new Error('Failed to fetch apps')
  return mockApps
}

export async function fetchGraph(appId: string): Promise<GraphData> {
  await delay(800)
  if (simulateError) throw new Error('Failed to fetch graph')
  const graph = mockGraphs[appId]
  if (!graph) throw new Error(`No graph found for app ${appId}`)
  return JSON.parse(JSON.stringify(graph)) as GraphData
}   