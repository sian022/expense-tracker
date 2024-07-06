import { useTheme } from "@emotion/react";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";

const TableContainerSkeleton = () => {
  const theme = useTheme();

  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <TableContainer
      sx={{
        flex: isSmall ? 1 : "auto",
        height: "calc(100vh - 440px)", // Adjust height based on screen size
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableCell key={`thead${index}`}>
                <Skeleton />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table body with expense data */}
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => {
            return (
              <TableRow key={`tbody${index}`}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableCell key={`tbodyRow${index}`}>
                    <Skeleton />
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableContainerSkeleton;
