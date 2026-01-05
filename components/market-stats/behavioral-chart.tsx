"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BehavioralPattern } from "@/types";

interface BehavioralChartProps {
  pattern: BehavioralPattern;
}

export function BehavioralChart({ pattern }: BehavioralChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{pattern.title}</CardTitle>
        <CardDescription>{pattern.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={pattern.data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-surface-muted)"
              />
              <XAxis
                dataKey="date"
                tick={{ fill: "var(--color-cool-gray)", fontSize: 12 }}
                tickLine={{ stroke: "var(--color-surface-muted)" }}
                axisLine={{ stroke: "var(--color-surface-muted)" }}
              />
              <YAxis
                tick={{ fill: "var(--color-cool-gray)", fontSize: 12 }}
                tickLine={{ stroke: "var(--color-surface-muted)" }}
                axisLine={{ stroke: "var(--color-surface-muted)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-canvas)",
                  border: "1px solid var(--color-surface-muted)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-lg)",
                }}
                labelStyle={{
                  color: "var(--color-deep-navy)",
                  fontWeight: 600,
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="retail"
                name="Retail Investors"
                stroke="var(--color-error)"
                strokeWidth={2}
                dot={{ fill: "var(--color-error)", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, stroke: "var(--color-error)", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="institutional"
                name="Institutional Investors"
                stroke="var(--color-muted-teal)"
                strokeWidth={2}
                dot={{ fill: "var(--color-muted-teal)", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, stroke: "var(--color-muted-teal)", strokeWidth: 2 }}
              />
              {/* Annotations */}
              {pattern.annotations.map((annotation, index) => {
                const dataPoint = pattern.data.find(d => d.date === annotation.x);
                if (!dataPoint) return null;
                return (
                  <ReferenceDot
                    key={index}
                    x={annotation.x}
                    y={dataPoint.retail}
                    r={8}
                    fill="var(--color-amber-gold)"
                    stroke="var(--color-canvas)"
                    strokeWidth={2}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Annotations legend */}
        {pattern.annotations.length > 0 && (
          <div className="mt-6 space-y-3">
            {pattern.annotations.map((annotation, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)]"
              >
                <div className="w-3 h-3 mt-1 rounded-full bg-[var(--color-amber-gold)] flex-shrink-0" />
                <div>
                  <div className="font-medium text-[var(--color-deep-navy)]">
                    {annotation.label}
                  </div>
                  <div className="text-[var(--text-body-sm)] text-[var(--color-cool-gray)]">
                    {annotation.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
