"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const chartColors = ["#C9A227", "#4ADE80", "#60A5FA", "#F97316", "#E879F9"];

const tooltipStyle = {
  background: "#111827",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 8,
  color: "#f8fafc"
};

export function CategoryBreakdownChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} innerRadius={56} outerRadius={92} dataKey="value" nameKey="name" paddingAngle={4}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function YieldByCategoryChart({ data }: { data: { category: string; yield: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ left: -18, right: 6, top: 10, bottom: 0 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="category" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(201,162,39,0.08)" }} />
        <Bar dataKey="yield" radius={[6, 6, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={entry.category} fill={chartColors[index % chartColors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function PlatformChart({ data }: { data: { platform: string; assets: number; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} layout="vertical" margin={{ left: 34, right: 8, top: 8, bottom: 8 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" horizontal={false} />
        <XAxis type="number" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis type="category" dataKey="platform" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} width={96} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="value" fill="#C9A227" radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RiskSentimentChart({ data }: { data: { name: string; risk: number; sentiment: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ left: -18, right: 12, top: 10, bottom: 0 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="risk" stroke="#F97316" strokeWidth={2} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="sentiment" stroke="#4ADE80" strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
