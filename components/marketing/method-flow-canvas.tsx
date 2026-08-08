"use client"

import { useCallback, useMemo } from "react"
import {
  Background,
  BackgroundVariant,
  Handle,
  Position,
  ReactFlow,
  useNodesState,
  type Edge,
  type Node,
  type NodeProps,
  type NodeTypes,
} from "@xyflow/react"

import "@xyflow/react/dist/base.css"

export interface FlowStep {
  id: string
  title: string
  body: string
}

type StepNodeData = { index: number; title: string; body: string }

/**
 * A single step in the learning loop. Styling comes from theme tokens so the
 * diagram follows light and dark mode without a second stylesheet.
 */
function StepNode({ data }: NodeProps<Node<StepNodeData>>) {
  return (
    <div className="w-[190px] rounded-xl border bg-card p-3.5 shadow-sm">
      <Handle
        type="target"
        position={Position.Left}
        className="!size-1.5 !border-0 !bg-border"
      />
      <p className="font-mono text-[0.625rem] text-muted-foreground">
        {String(data.index).padStart(2, "0")}
      </p>
      <p className="mt-1 font-heading text-sm font-semibold">{data.title}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{data.body}</p>
      <Handle
        type="source"
        position={Position.Right}
        className="!size-1.5 !border-0 !bg-border"
      />
    </div>
  )
}

const nodeTypes: NodeTypes = { step: StepNode }

/** Two rows of the loop, so it stays readable on a narrow viewport. */
const positions = [
  { x: 0, y: 0 },
  { x: 240, y: 0 },
  { x: 480, y: 0 },
  { x: 120, y: 150 },
  { x: 360, y: 150 },
]

export default function MethodFlowCanvas({ steps }: { steps: FlowStep[] }) {
  const initialNodes = useMemo<Node<StepNodeData>[]>(
    () =>
      steps.map((step, index) => ({
        id: step.id,
        type: "step",
        position: positions[index] ?? { x: index * 240, y: 0 },
        data: { index: index + 1, title: step.title, body: step.body },
      })),
    [steps]
  )

  const edges = useMemo<Edge[]>(
    () =>
      steps.slice(0, -1).map((step, index) => ({
        id: `${step.id}-${steps[index + 1].id}`,
        source: step.id,
        target: steps[index + 1].id,
        animated: true,
        style: { stroke: "var(--border)", strokeWidth: 1.5 },
      })),
    [steps]
  )

  const [nodes, , onNodesChange] = useNodesState(initialNodes)

  const fitViewOptions = useCallback(() => ({ padding: 0.15 }), [])

  return (
    <div className="h-[380px] w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions()}
        proOptions={{ hideAttribution: true }}
        nodesConnectable={false}
        edgesFocusable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        preventScrolling={false}
        minZoom={0.5}
        maxZoom={1.4}
        className="[&_.react-flow\\_\\_attribution]:hidden"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          className="opacity-40"
        />
      </ReactFlow>
    </div>
  )
}
