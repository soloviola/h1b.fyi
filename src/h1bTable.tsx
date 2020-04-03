import React, { Component, forwardRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { COLUMN_INDEX } from './Consts';
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import {
  createStyles,
  makeStyles,
  Theme
} from "@material-ui/core/styles";

const tableColumns = [
  { field: "jobTitle", title: "Job Title" },
  { field: "employerName", title: "Company Name" },
  { field: "wage", title: "Wage" }
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2)
    }
  })
);

const tableIcons = {
  Add: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ViewColumn {...props} ref={ref} />)
};

const H1bTable = (params: { searchResult: any[]; }) => {
  const classes = useStyles();

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
      jobTitle: item[COLUMN_INDEX["JOB_TITLE"]],
      employerName: item[COLUMN_INDEX['EMPLOYER_NAME']],
      wage
    }
  })
  const isVisible = params.searchResult.length === 0 ? "hidden": "visible"
  return (
    <Box visibility={isVisible}>
      <Paper className={classes.paper}>
        <MaterialTable
          icons={tableIcons}
          title="Search Result"
          columns={tableColumns}
          data={formattedResult}
          options={{
            sorting: true, 
            filtering: true,
            padding: 'dense',
            pageSize: 10,
            pageSizeOptions: [10, 20, 50, 100],
            paginationType: "normal"
          }}
        />
      </Paper>
    </Box>
  );
}

export default H1bTable