"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface TreeNode {
  id: string
  title: string
  description?: string
  children?: TreeNode[]
  action?: string
}

interface DecisionTreeViewerProps {
  root: TreeNode
  onNodeSelect?: (node: TreeNode) => void
}

export function DecisionTreeViewer({ root, onNodeSelect }: DecisionTreeViewerProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([root.id]))

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
  }

  const renderNode = (node: TreeNode, depth = 0): React.ReactNode => {
    const isExpanded = expandedNodes.has(node.id)
    const hasChildren = node.children && node.children.length > 0

    return (
      <div key={node.id} className="mb-2">
        <div className="flex items-start gap-2" style={{ marginLeft: `${depth * 20}px` }}>
          {hasChildren && (
            <Button variant="ghost" size="sm" onClick={() => toggleNode(node.id)} className="h-6 w-6 p-0">
              <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
            </Button>
          )}
          {!hasChildren && <div className="w-6" />}
          <Card className="flex-1 cursor-pointer hover:bg-accent/5" onClick={() => onNodeSelect?.(node)}>
            <CardContent className="p-3">
              <p className="font-semibold">{node.title}</p>
              {node.description && <p className="text-xs text-muted-foreground">{node.description}</p>}
            </CardContent>
          </Card>
        </div>
        {isExpanded && hasChildren && <div>{node.children.map((child) => renderNode(child, depth + 1))}</div>}
      </div>
    )
  }

  return <div className="space-y-2">{renderNode(root)}</div>
}
