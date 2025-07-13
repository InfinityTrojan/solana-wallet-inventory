"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download } from "lucide-react"

interface ExportDataButtonProps {
  data: any[]
  filename: string
}

export function ExportDataButton({ data, filename }: ExportDataButtonProps) {
  const exportToJson = () => {
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportToCsv = () => {
    if (data.length === 0) return

    const headers = Object.keys(data[0])
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((fieldName) => {
            let value = row[fieldName]
            if (typeof value === "object" && value !== null) {
              value = JSON.stringify(value) // Stringify nested objects/arrays
            }
            if (typeof value === "string" && value.includes(",")) {
              return `"${value.replace(/"/g, '""')}"` // Handle commas and quotes
            }
            return value
          })
          .join(","),
      ),
    ]

    const csvString = csvRows.join("\n")
    const blob = new Blob([csvString], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-3 text-foreground/80 border-border bg-background/50 hover:bg-background/80"
        >
          <Download className="h-4 w-4 mr-2" /> Export Data
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-md border-border shadow-lg">
        <DropdownMenuItem onClick={exportToCsv}>Export as CSV</DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJson}>Export as JSON</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
