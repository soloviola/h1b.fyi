import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from '@material-ui/core/Paper';
import { COLUMN_INDEX } from './Consts';
import {
  createStyles,
  lighten,
  makeStyles,
  Theme
} from "@material-ui/core/styles";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

interface Data {
  id: string;
  jobTitle: string;
  employerName: string;
  wage: number;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const headCells: HeadCell[] = [
  { id: "jobTitle", numeric: false, disablePadding: false, label: "Job Title" },
  { id: "employerName", numeric: false, disablePadding: false, label: "Employer Name" },
  { id: "wage", numeric: true, disablePadding: false, label: "Wage" },
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// const handleChangePage = (event: unknown, newPage: number) => {
//   setPage(newPage);
// };

// const handleChangeRowsPerPage = (
//   event: React.ChangeEvent<HTMLInputElement>
// ) => {
//   setRowsPerPage(parseInt(event.target.value, 10));
//   setPage(0);
// };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1
    }
  })
);

const H1bTable = (params: { searchResult: any[]; }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("wage");
  const [selected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const formattedResult = params.searchResult.map((item: any, key) => {
    let wage = 0
    if (!!item[COLUMN_INDEX['WAGE_RATE_OF_PAY_TO_1']]) {
      wage = item[COLUMN_INDEX['WAGE_RATE_OF_PAY_TO_1']]
    }
    else if (!!item[COLUMN_INDEX['WAGE_RATE_OF_PAY_FROM_1']]) {
      wage = item[COLUMN_INDEX['WAGE_RATE_OF_PAY_FROM_1']]
    }
    else {
      wage = item[COLUMN_INDEX['PREVAILING_WAGE_1']]
    }
    return {
      id: key,
      jobTitle: item[COLUMN_INDEX["JOB_TITLE"]],
      employerName: item[COLUMN_INDEX['EMPLOYER_NAME']],
      wage
    }
  })
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, formattedResult.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <colgroup>
          <col width="50%" />
          <col width="20%" />
          <col width="30%" />
        </colgroup>
        <EnhancedTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={formattedResult.length}
        />
        <TableBody>
          {stableSort(formattedResult, getComparator(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow tabIndex={-1} key={row.id}>
                      <TableCell component="th" scope="row" align="left"> {row.jobTitle} </TableCell>
                      <TableCell align="left">{row.employerName}</TableCell>
                      <TableCell align="right">{row.wage}</TableCell>
                    </TableRow>
                  );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default H1bTable