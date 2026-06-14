import { Node as RFNode } from '@xyflow/react'

export type NodeStatus = 'Healthy' | 'Degraded' | 'Down'
export type NodeKind = 'service' | 'database'

export interface ServiceNodeData extends Record<string, unknown> {
  label: string
  description?: string
  status: NodeStatus
  type: NodeKind
  sliderValue: number
}

export interface App {
  id: string
  name: string
  description: string
  icon: string
}

export interface GraphData {
  nodes: ServiceNode[]
  edges: GraphEdge[]
}

export type ServiceNode = RFNode<ServiceNodeData>

export interface GraphEdge {
  id: string
  source: string
  target: string
  animated?: boolean
} 