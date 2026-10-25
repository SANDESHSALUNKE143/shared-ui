/**
 * Kind: external
 * Purpose: a list of records. A phone shows one card per row. A wider screen shows the grid.
 * Used by: admin lists.
 */

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DataGrid, type GridColDef, type GridRowsProp } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { XCard } from "../XCards";
import { XEmpty } from "../XFeedback/XEmpty";

export type XDataGridProps = {
  rows: GridRowsProp;
  columns: GridColDef[];
  compact?: boolean;
  emptyMessage?: string;
};

export function XDataGrid({ rows, columns, compact, emptyMessage = "No results." }: XDataGridProps) {
  const theme = useTheme();
  const narrow = useMediaQuery(theme.breakpoints.down("sm"));
  const stacked = compact ?? narrow;
  if (rows.length === 0) return <XEmpty message={emptyMessage} />;
  if (stacked) {
    return (
      <Stack spacing={1}>
        {rows.map((row) => (
          <XCard key={String(row.id)}>
            <Stack spacing={0.5} sx={{ p: 2 }}>
              {columns.map((column) => (
                <Box key={column.field}>
                  <Typography variant="caption" color="text.secondary">
                    {column.headerName ?? column.field}
                  </Typography>
                  <Typography>{String(row[column.field] ?? "")}</Typography>
                </Box>
              ))}
            </Stack>
          </XCard>
        ))}
      </Stack>
    );
  }
  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <DataGrid rows={rows} columns={columns} autoHeight disableRowSelectionOnClick />
    </Box>
  );
}
