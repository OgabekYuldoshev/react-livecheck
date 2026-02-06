import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface APISectionRow {
	cells: string[];
}

export function APISection({
	title,
	headers,
	rows,
	className,
}: {
	title?: string;
	headers: string[];
	rows: APISectionRow[];
	className?: string;
}) {
	return (
		<section className={cn("space-y-1.5", className)}>
			{title && <h3 className="text-base font-medium">{title}</h3>}
			<div className="overflow-x-auto rounded-md border border-border/50">
				<Table>
					<TableHeader>
						<TableRow>
							{headers.map((h) => (
								<TableHead key={h}>{h}</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.cells[0] ?? String(row.cells)}>
								{row.cells.map((cell, cellIdx) => (
									<TableCell key={`${row.cells[0]}-${cellIdx}`}>{cell}</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</section>
	);
}
