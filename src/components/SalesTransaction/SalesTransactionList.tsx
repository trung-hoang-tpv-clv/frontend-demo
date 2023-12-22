import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as qs from 'qs';
import useSWR from "swr";
import {
  GetSalesTransactionListRequest,
  GetSalesTransactionListResponse,
  SalesTransactionSortBy,
} from '@/common/types';
import { API_BASE_URL } from '@/common/constant';
import { TableFooter, TablePagination } from '@mui/material';
import { fetcher } from '@/common/utils/fetcher';

function SalesTransactionList() {
  const [query, setQuery] = React.useState<GetSalesTransactionListRequest>({
    pageSize: 10,
    pageIndex: 1,
    sortBy: SalesTransactionSortBy.NewestFirst,
    custCode: '',
    custEmail: '',
    custName: '',
    transactionCode: '',
  });

  const { data } = useSWR<GetSalesTransactionListResponse>(
    `${API_BASE_URL}/sales-transactions?${qs.stringify(query)}`,
    (url: string) => fetcher(url),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    console.log(newPage)
    setQuery({
      ...query,
      pageIndex: newPage + 1,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setQuery({
      ...query,
      pageSize: parseInt(event.target.value, 10),
      pageIndex: 1,
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Customer</TableCell>
            <TableCell align="center">Payment</TableCell>
            <TableCell align="center">Transaction Code</TableCell>
            <TableCell align="center">Source</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="left">Item Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.items?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.custName}</TableCell>
              <TableCell align="center">{row.payment}</TableCell>
              <TableCell align="center">{row.transactionCode}</TableCell>
              <TableCell align="center">{row.source}</TableCell>
              <TableCell align="center">{new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'VND',
              }).format(row.amount)}</TableCell>
              <TableCell align="left">{row.itemName}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 30]}
              colSpan={3}
              count={data?.total || 0}
              rowsPerPage={query.pageSize}
              page={query.pageIndex - 1}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              // ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default SalesTransactionList;
