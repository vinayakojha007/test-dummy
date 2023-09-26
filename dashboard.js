/* eslint-disable no-restricted-syntax */
/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
/* eslint-disable no-use-before-define */
/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-dupe-keys */
import { useState, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Row, Col, Spin } from 'antd';
import PropTypes from 'prop-types';
import { Chart } from '../../../components/chart/chart';
import { getDashboardExecute, getDashboardListByIds } from '../../../actions/apiActions';
import { showWarningMessageAlert, getStatusFieldColors } from '../../../utilities/utility';
import { DataMode } from '../../../components/chart/datamode';
import './style.css';

const TxnDashboard = ({ mode, fromDate, toDate, businessId, date, refDashboardIds }) => {
  const CHART_COLORS = [
    '#09c',
    '#23D8FF',
    '#D25BFF',
    '#FF3E63',
    '#5D9CEC',
    '#4FC1E9',
    '#09c',
    '#FFCE54',
    '#FC6E51',
    '#ED5565',
    '#7523FF',
    '#FF6663',
    '#09c',
    '#23D8FF',
    '#D25BFF',
    '#FF3E63',
    '#5D9CEC',
    '#4FC1E9',
    '#09c',
    '#FFCE54',
    '#FC6E51',
    '#ED5565',
    '#7523FF',
    '#FF6663',
    '#09c',
    '#23D8FF',
    '#D25BFF',
    '#FF3E63',
    '#5D9CEC',
    '#4FC1E9',
    '#09c',
    '#FFCE54',
    '#FC6E51',
    '#ED5565',
    '#7523FF',
    '#FF6663',
    '#09c',
    '#23D8FF',
    '#D25BFF',
    '#FF3E63',
    '#5D9CEC',
    '#4FC1E9',
    '#09c',
    '#FFCE54',
    '#FC6E51',
    '#ED5565',
    '#7523FF',
    '#FF6663',
    '#09c',
    '#23D8FF',
    '#D25BFF',
    '#FF3E63',
    '#5D9CEC',
    '#4FC1E9',
    '#09c',
    '#FFCE54',
    '#FC6E51',
    '#ED5565',
    '#7523FF',
    '#FF6663',
    '#09c',
    '#23D8FF',
    '#D25BFF',
    '#FF3E63',
    '#5D9CEC',
    '#4FC1E9',
    '#09c',
    '#FFCE54',
    '#FC6E51',
    '#ED5565',
    '#7523FF',
    '#FF6663',
    '#09c',
    '#23D8FF',
    '#D25BFF',
    '#FF3E63',
    '#5D9CEC',
    '#4FC1E9',
    '#09c',
    '#FFCE54',
    '#FC6E51',
    '#ED5565',
    '#7523FF',
    '#FF6663',
    '#09c',
    '#23D8FF',
    '#D25BFF',
    '#FF3E63',
    '#5D9CEC',
    '#4FC1E9',
    '#09c',
    '#FFCE54',
    '#FC6E51',
    '#ED5565',
    '#7523FF',
    '#FF6663',
    '#09c',
    '#23D8FF',
    '#D25BFF',
    '#FF3E63',
    '#5D9CEC',
    '#4FC1E9',
    '#09c',
    '#FFCE54',
    '#FC6E51',
    '#ED5565',
    '#7523FF',
    '#FF6663',
    '#09c',
    '#23D8FF',
    '#D25BFF',
    '#FF3E63',
    '#5D9CEC',
    '#4FC1E9',
    '#09c',
    '#FFCE54',
    '#FC6E51',
    '#ED5565',
    '#7523FF',
    '#FF6663',
  ];

  const [dashboardData, setDashboardData] = useState([]);
  const [refDashBoardIds] = useState(refDashboardIds);
  // const [serviceDashBoardListData, setServiceDashBoardListData] = useState([]);
  const [dataModeIds, setDataModeIds] = useState([]);
  const [dataModeInfo, setDataModeData] = useState([]);
  const [graphDashboardIds, setGraphDashboardIds] = useState([]);
  const [graphGroupByTotal, setGraphGroupByTotal] = useState();
  const bizAccountServiceList = JSON.parse(localStorage.getItem(`${businessId}_biz_accocunt_user_service_list`));
  const serviceDashBoardListData = [];

  // getting the data mode dashboard data by dashboard id.
  const executeDataModeServiceDashboardById = async (refDBId) => {
    const interval = mode === 'YEAR' || mode === 'LAST_YEAR' ? 'MONTH' : 'DAY';
    const queryParams = new URLSearchParams({
      fromDate,
      toDate,
      interval,
    });
    try {
      const response = await getDashboardExecute(queryParams, refDBId);
      const res = response.data;
      if (res.statusCode === 0) {
        if (res.data !== undefined) {
          setDataModeData((previousData) => [...previousData, res.data]);
        }
      }
    } catch (error) {
      // Handle any errors that occur during the process
    }
  };

  const prepareGraphData = (
    graphLabelData,
    graphData,
    refDBId,
    graphType,
    displayLabel,
    dimLabel,
    measLabel,
    dateKey,
    graphGroupData,
    graphGroupByKeys,
    resGraphType,
    graphInfoObj,
  ) => {
    // preparin the graph options data.
    const graphOptions = prepareGraphOptions(
      graphLabelData,
      graphData,
      refDBId,
      graphType,
      displayLabel,
      dimLabel,
      measLabel,
      dateKey,
      graphGroupData,
      graphGroupByKeys,
      resGraphType,
    );
    if (refDBId) {
      // bar graph function.
      if (graphType === 'bar' || graphType === 'line') {
        const arr = [];
        const colors = CHART_COLORS;
        const dateColors = colors;
        // we are handling separately based on the date graph category
        // if the date graph category we are not sorting other wise we are sorting the data..
        const sortedDataLablesArr = [];
        const sortDataArray = [];
        const sortArray = [];
        if (!dateKey) {
          graphData.forEach((val, key) => {
            sortArray.push({
              label: graphLabelData[key],
              value: val,
            });
          });
          sortArray.sort(function (a, b) {
            return b.label - a.label;
          });
          sortArray.forEach((val, key) => {
            sortDataArray.push(val.value);
            sortedDataLablesArr.push(sortArray[key].label);
          });
        } else {
          // eslint-disable-next-line no-unused-vars
          graphData.forEach((val, key) => {
            arr.push(val);
          });
        }
        // checking given dashboard data is applied on status field or not
        // if it is status field then we are going to apply status field colors(options) to the graphs(bar colors).
        let labelsArr = dateKey === true ? graphLabelData : sortedDataLablesArr;
        if (
          resGraphType === 'STACKED_BAR_GRAPH' ||
          resGraphType === 'STACKED_VERTICAL_GRAPH' ||
          resGraphType === 'STACKED_LINE_GRAPH'
        ) {
          labelsArr = graphGroupByKeys;
          console.log('================================>');
          console.log(labelsArr);
        }
        const statusColorsArr =
          getStatusFieldColors(refDBId, resGraphType, labelsArr, serviceDashBoardListData, businessId) || [];
        const barColors = statusColorsArr && statusColorsArr.length > 0 ? statusColorsArr : colors;
        const dataSets = [
          {
            data: dateKey === true ? arr : sortDataArray,
            backgroundColor: dateKey === true ? dateColors : barColors,
          },
        ];
        if (
          resGraphType === 'STACKED_BAR_GRAPH' ||
          resGraphType === 'STACKED_VERTICAL_GRAPH' ||
          resGraphType === 'STACKED_LINE_GRAPH'
        ) {
          const labels = dateKey === true ? graphLabelData : sortedDataLablesArr;
          const dataSets = [];
          console.log(graphGroupByKeys);
          graphGroupByKeys.forEach((byKey, idx) => {
            const preObj = {
              label: byKey,
              backgroundColor: barColors[idx],
              data: [],
            };
            console.log('====================================');
            console.log(preObj);
            console.log('====================================');
            if (resGraphType === 'STACKED_VERTICAL_GRAPH') {
              preObj.stack = byKey;
            } else if (resGraphType === 'STACKED_LINE_GRAPH') {
              preObj.borderColor = preObj.backgroundColor;
              preObj.fill = false;
              preObj.pointBorderWidth = 3;
            }
            console.log('================================');
            console.log(graphGroupData);
            labels.forEach((xLabel) => {
              console.log(xLabel);
              if (graphGroupData[xLabel] && graphGroupData[xLabel][byKey]) {
                preObj.data.push(graphGroupData[xLabel][byKey]);
                console.log('====================================');
                console.log(preObj.data.push(graphGroupData[xLabel][byKey]));
                console.log('====================================');
              } else if (!graphGroupData[xLabel]) {
                preObj.data.push(0);
              } else {
                preObj.data.push(0);
              }
            });
            dataSets.push(preObj);
          });
          console.log(dataSets);
        }
        setDashboardData((previousData) => [
          ...previousData,
          {
            id: refDBId,
            type: graphType,
            data: {
              labels: dateKey === true ? graphLabelData : sortedDataLablesArr,
              datasets: dataSets,
            },
            options: graphOptions,
            graphInfo: graphInfoObj,
          },
        ]);
      } else {
        const colors = CHART_COLORS;
        const dateColors = colors;
        // checking given dashboard data is applied on status field or not
        // if it is status field then we are going to apply status field colors(options) to the graphs(bar colors).
        const labelsArr = graphLabelData;
        const statusColorsArr =
          getStatusFieldColors(refDBId, resGraphType, labelsArr, serviceDashBoardListData, businessId) || [];
        const barColors = statusColorsArr && statusColorsArr.length > 0 ? statusColorsArr : colors;
        setDashboardData((previousData) => [
          ...previousData,
          {
            id: refDBId,
            type: graphType,
            data: {
              labels: graphLabelData,
              datasets: [
                {
                  data: graphData,
                  backgroundColor:
                    dateKey === true
                      ? dateColors.splice(0, graphLabelData.length)
                      : barColors.splice(0, graphLabelData.length),
                  borderWidth: 2,
                },
              ],
            },
            options: graphOptions,
            graphInfo: graphInfoObj,
          },
        ]);
      }
    }
  };

  const fetchDashboardData = async (refDBId, fromDate, toDate) => {
    const interval = mode === 'YEAR' || mode === 'LAST_YEAR' ? 'MONTH' : 'DAY';
    // Construct the query parameters
    const queryParams = new URLSearchParams({
      fromDate,
      toDate,
      interval,
    });
    try {
      const response = await getDashboardExecute(queryParams, refDBId);
      const type = response.data.data?.type;
      if (response?.data) {
        const graphLabelData = [];
        const graphData = [];
        const graphGroupByData = {};
        const graphGroupByKeys = [];
        if (type !== 'DATA_MODE') {
          // Look up fields graphs functionality.
          console.log('++++++++++++++++++++++++++++++++++++++++++++');
          console.log(response?.data?.data);
          if (response?.data?.data?.lookups && response?.data?.data?.lookups.length > 0) {
            // Check if keys exist and prepare keys based on values.
            // If keys are not in response.data.aggregations.x.buckets, use 0 as value.
            if (response.data.aggregations && response.data.aggregations.x.buckets.length > 0) {
              if (response.data.lookups && response.data.lookups.length > 0) {
                response.data.lookups.forEach((objKey) => {
                  const findObj = response.data.aggregations.x.buckets.find(
                    (bucket) => bucket.key === objKey[response.data.lookupKey],
                  );
                  if (findObj) {
                    let xKey = '';
                    if (response.data.fieldKey) {
                      let lookupFieldKey = '';
                      if (response.data.fieldKey.includes('fields.')) {
                        lookupFieldKey = objKey.fields[response.data.fieldKey.replace('fields.', '')].value || '';
                      } else {
                        lookupFieldKey = objKey[response.data.fieldKey] || '';
                      }
                      graphLabelData.push(lookupFieldKey);
                      if (
                        response.data.type === 'STACKED_BAR_GRAPH' ||
                        response.data.type === 'STACKED_VERTICAL_GRAPH' ||
                        response.data.type === 'STACKED_LINE_GRAPH'
                      ) {
                        console.log('lookupFieldKEY: {}SEPT25', lookupFieldKey);
                        graphGroupByData[lookupFieldKey] = {};
                        if (response.data.aggregatedBy !== 'COUNT') {
                          graphGroupByTotal[refDBId][lookupFieldKey] = {};
                        }
                        xKey = lookupFieldKey;
                      }
                    }
                    if (response.data.aggregatedBy === 'COUNT') {
                      if (checkFloatNumber(findObj.doc_count)) {
                        graphData.push(Math.round(findObj.doc_count * 100) / 100);
                      } else {
                        graphData.push(findObj.doc_count);
                      }
                    } else if (findObj.y) {
                      if (checkFloatNumber(findObj.y.value)) {
                        graphData.push(Math.round(findObj.y.value * 100) / 100);
                      } else {
                        graphData.push(findObj.y.value);
                      }
                    } else {
                      graphData.push(0);
                    }
                    // stacked bar graph doc counts
                    if (findObj.groupBy && findObj.groupBy.buckets && graphGroupByData[xKey]) {
                      findObj?.groupBy?.buckets.forEach((grpBukObj) => {
                        let modifiedCount = grpBukObj?.doc_count;
                        if (checkFloatNumber(grpBukObj?.doc_count)) {
                          modifiedCount = Math.round(grpBukObj.doc_count * 100) / 100;
                        }
                        if (grpBukObj?.key && grpBukObj?.key !== '') {
                          graphGroupByData[xKey][grpBukObj.key] = modifiedCount;
                          if (grpBukObj.y) {
                            graphGroupByTotal[refDBId][xKey][grpBukObj.key] = grpBukObj.y.value;
                          }
                          if (!_.contains(graphGroupByKeys, grpBukObj.key)) {
                            graphGroupByKeys.push(grpBukObj.key);
                          }
                        }
                      });
                    }
                    // eslint-disable-next-line no-useless-return
                    return;
                  }
                  if (response.data.fieldKey) {
                    let lookupFieldKey = '';
                    if (response.data.fieldKey.includes('fields.')) {
                      lookupFieldKey = objKey.fields[response.data.fieldKey.replace('fields.', '')].value || '';
                    } else {
                      lookupFieldKey = objKey[response.data.fieldKey] || '';
                    }
                    graphLabelData.push(lookupFieldKey);
                    if (
                      response.data.type === 'STACKED_BAR_GRAPH' ||
                      response.data.type === 'STACKED_VERTICAL_GRAPH' ||
                      response.data.type === 'STACKED_LINE_GRAPH'
                    ) {
                      if (lookupFieldKey !== '') {
                        graphGroupByData[lookupFieldKey] = {};
                      }
                      if (response.data.aggregatedBy !== 'COUNT' && lookupFieldKey !== '') {
                        graphGroupByTotal[refDBId][lookupFieldKey] = {};
                      }
                    }
                    graphData.push(0);
                  }
                });
              }
            }
          }
          // reaming field scenarios functionality.
          else {
            // if keys are exist then iterating the keys and preparing the keys based on the values.
            // if the keys are not exist in response.data.aggregations.x.buckets then preparing key and value is 0.
            if (response?.data?.data?.aggregations && response?.data?.data?.aggregations?.x?.buckets?.length > 0) {
              // if (response?.data?.data?.date === undefined && (!response?.data?.data?.keys || response?.data?.data?.keys.length === 0)) {
              if (
                response?.data?.data?.date === undefined &&
                (!response?.data?.data?.keys || response?.data?.data?.keys.length === 0)
              ) {
                response.data.data.keys = [];
                response?.data?.data?.aggregations.x.buckets.forEach((xbucObj) => {
                  console.log(xbucObj);
                  if (xbucObj.key && xbucObj.key !== '') {
                    response?.data?.data?.keys.push(xbucObj.key);
                  }
                });
              }

              if (response?.data?.data?.keys && response?.data?.data?.keys.length > 0) {
                response?.data?.data?.keys.forEach((objKey) => {
                  const findObj = response?.data?.data?.aggregations.x.buckets.find((bucket) => bucket.key === objKey);
                  console.log('====================================');
                  console.log(findObj);
                  console.log('====================================');
                  if (findObj) {
                    let xKey = findObj.key;
                    if (typeof findObj.key === 'number') {
                      xKey = moment(findObj.key).format('dd-MMM-yyyy');
                      graphLabelData.push(moment(findObj.key).format('dd-MMM-yyyy'));
                    } else {
                      graphLabelData.push(findObj.key);
                    }
                    console.log('====================================');
                    console.log(response?.data?.data?.type);
                    console.log('====================================');
                    if (
                      response?.data?.data?.type === 'STACKED_BAR_GRAPH' ||
                      response?.data?.data?.type === 'STACKED_VERTICAL_GRAPH' ||
                      response?.data?.data?.type === 'STACKED_LINE_GRAPH'
                    ) {
                      graphGroupByData[xKey] = {};
                      if (response?.data?.data?.aggregatedBy !== 'COUNT') {
                        graphGroupByTotal[refDBId][xKey] = {};
                        console.log(graphGroupByTotal[refDBId][xKey]);
                      }
                    }
                    if (response?.data?.data?.aggregatedBy === 'COUNT') {
                      if (checkFloatNumber(findObj.doc_count)) {
                        graphData.push(Math.round(findObj.doc_count * 100) / 100);
                      } else {
                        graphData.push(findObj.doc_count);
                      }
                    } else if (findObj.y) {
                      if (checkFloatNumber(findObj.y.value)) {
                        graphData.push(Math.round(findObj.y.value * 100) / 100);
                      } else graphData.push(findObj.y.value);
                    } else {
                      graphData.push(0);
                    }
                    // stacked bar graph doc counts
                    console.log(graphGroupByData);
                    console.log(findObj);
                    if (findObj.groupBy && findObj.groupBy.buckets && graphGroupByData[xKey]) {
                      findObj.groupBy.buckets.forEach((grpBukObj) => {
                        console.log(grpBukObj);
                        let modifiedCount = grpBukObj.doc_count;
                        if (checkFloatNumber(grpBukObj.doc_count)) {
                          modifiedCount = Math.round(grpBukObj.doc_count * 100) / 100;
                        }
                        if (grpBukObj.key && grpBukObj.key !== '') {
                          graphGroupByData[xKey][grpBukObj.key] = modifiedCount;
                          console.log(graphGroupByData);
                          console.log(grpBukObj.y);
                          if (grpBukObj.y) {
                            console.log(grpBukObj.y);
                            graphGroupByTotal[refDBId][xKey][grpBukObj.key] = grpBukObj.y.value;
                          }
                          if (!graphGroupByKeys.includes(grpBukObj.key)) {
                            graphGroupByKeys.push(grpBukObj.key);
                          }
                          // if (!_.contains(graphGroupByKeys, grpBukObj.key)) {
                          //     graphGroupByKeys.push(grpBukObj.key);
                          // }
                        }
                      });
                    }
                    // eslint-disable-next-line no-useless-return
                    return;
                  } else {
                    let xKey = '';
                    if (typeof objKey === 'number') {
                      xKey = moment(objKey).format('dd-MMMM-yyyy');
                      graphLabelData.push(moment(objKey).format('dd-MMMM-yyyy'));
                    } else {
                      graphLabelData.push(objKey);
                    }
                    if (
                      response?.data?.data?.type === 'STACKED_BAR_GRAPH' ||
                      response?.data?.data?.type === 'STACKED_VERTICAL_GRAPH' ||
                      response?.data?.data?.type === 'STACKED_LINE_GRAPH'
                    ) {
                      if (xKey !== '') {
                        graphGroupByData[xKey] = {};
                      }
                      if (response?.data?.data?.aggregatedBy !== 'COUNT' && xKey !== '') {
                        graphGroupByTotal[refDBId][xKey] = {};
                      }
                    }
                    graphData.push(0);
                  }
                });
              }
              // handled date graphs.
              else {
                // month wise date handling
                let datesArray = [];
                if (fromDate && toDate) {
                  datesArray = getDateArray(fromDate, toDate);
                  if (datesArray && datesArray.length > 0) {
                    datesArray.forEach((objKey) => {
                      const findObj = response?.data?.data?.aggregations.x.buckets.find(
                        (bucket) => bucket.key_as_string === objKey,
                      );
                      if (findObj) {
                        let monthOrWeek;
                        if (mode === 'MONTH') {
                          monthOrWeek = moment(findObj.key).format('DD');
                        } else if (mode === 'YEAR' || mode === 'LAST_YEAR') {
                          monthOrWeek = objKey;
                        } else {
                          monthOrWeek = moment(findObj.key).format('ddd');
                        }
                        graphLabelData.push(monthOrWeek);
                        if (
                          response?.data?.data?.type === 'STACKED_BAR_GRAPH' ||
                          response?.data?.data?.type === 'STACKED_VERTICAL_GRAPH' ||
                          response?.data?.data?.type === 'STACKED_LINE_GRAPH'
                        ) {
                          graphGroupByData[monthOrWeek] = {};
                          if (response?.data?.data?.aggregatedBy !== 'COUNT') {
                            graphGroupByTotal[refDBId][monthOrWeek] = {};
                          }
                        }
                        if (response?.data?.data?.aggregatedBy === 'COUNT') {
                          if (checkFloatNumber(findObj.doc_count)) {
                            graphData.push(Math.round(findObj.doc_count * 100) / 100);
                          } else {
                            graphData.push(findObj.doc_count);
                          }
                        } else if (findObj.y) {
                          if (checkFloatNumber(findObj.y.value)) {
                            graphData.push(Math.round(findObj.y.value * 100) / 100);
                          } else {
                            graphData.push(findObj.y.value);
                          }
                        } else {
                          graphData.push(0);
                        }
                        // stacked bar graph doc counts
                        if (findObj.groupBy && findObj.groupBy.buckets && graphGroupByData[monthOrWeek]) {
                          findObj.groupBy.buckets.forEach((grpBukObj) => {
                            let modifiedCount = grpBukObj.doc_count;
                            if (checkFloatNumber(grpBukObj.doc_count)) {
                              modifiedCount = Math.round(grpBukObj.doc_count * 100) / 100;
                            }
                            if (grpBukObj.key && grpBukObj.key !== '') {
                              graphGroupByData[monthOrWeek][grpBukObj.key] = modifiedCount;
                              if (grpBukObj.y) {
                                graphGroupByTotal[refDBId][monthOrWeek][grpBukObj.key] = grpBukObj.y.value;
                              }
                              if (!_.includes(graphGroupByKeys, grpBukObj.key)) {
                                graphGroupByKeys.push(grpBukObj.key);
                              }
                            }
                          });
                        }
                      } else {
                        let monthOrWeek = '';
                        if (mode === 'MONTH') {
                          monthOrWeek = moment(objKey).format('DD');
                        } else if (mode === 'YEAR' || mode === 'LAST_YEAR') {
                          monthOrWeek = objKey;
                        } else {
                          monthOrWeek = moment(objKey).format('ddd');
                        }
                        graphLabelData.push(monthOrWeek);
                        if (
                          response?.data?.data?.type === 'STACKED_BAR_GRAPH' ||
                          response?.data?.data?.type === 'STACKED_VERTICAL_GRAPH' ||
                          response?.data?.data?.type === 'STACKED_LINE_GRAPH'
                        ) {
                          if (monthOrWeek !== '') {
                            graphGroupByData[monthOrWeek] = {};
                          }
                          if (response?.data?.data?.aggregatedBy !== 'COUNT' && monthOrWeek !== '') {
                            graphGroupByTotal[refDBId][monthOrWeek] = {};
                          }
                        }
                        graphData.push(0);
                      }
                    });
                  }
                }
              }
            }
            // showing empty graphs if there is empty bucket
            else {
              if (response?.data?.data?.keys && response?.data?.data?.keys.length > 0) {
                response?.data?.data?.keys.forEach((objKey) => {
                  graphLabelData.push(objKey);
                  graphData.push(0);
                });
              } else if (response?.data?.data?.date) {
                // month wise date handling
                let datesArray = [];
                if (fromDate && toDate) {
                  datesArray = getDateArray(fromDate, toDate);
                  if (datesArray && datesArray.length > 0) {
                    datesArray.forEach((objKey) => {
                      let monthOrWeek;
                      if (mode === 'MONTH') {
                        monthOrWeek = moment(objKey).format('DD');
                      } else if (mode === 'YEAR' || mode === 'LAST_YEAR') {
                        monthOrWeek = objKey;
                      } else {
                        monthOrWeek = moment(objKey).format('ddd');
                      }
                      graphLabelData.push(monthOrWeek);
                      graphData.push(0);
                      // eslint-disable-next-line no-useless-return
                      return;
                    });
                  }
                }
              }
            }
          }
          let graphType = 'doughnut';
          let dimLabel = '';
          let measLabel = '';
          if (
            response?.data?.data?.type === 'SINGLE_BAR_GRAPH' ||
            response?.data?.data?.type === 'STACKED_BAR_GRAPH' ||
            response?.data?.data?.type === 'STACKED_VERTICAL_GRAPH'
          ) {
            graphType = 'bar';
            dimLabel = response?.data?.data?.dimLabel;
            measLabel = response?.data?.data?.measLabel;
          } else if (response?.data?.data?.type === 'STACKED_LINE_GRAPH') {
            graphType = 'line';
            dimLabel = response?.data?.data?.dimLabel;
            measLabel = response?.data?.data?.measLabel;
          }
          console.log(graphData);
          graphData.forEach((grphData, grphIdx) => {
            if (!grphData) {
              graphData[grphIdx] = 0;
            }
          });
          let countData = 0;

          countData = graphData.reduce(function (a, b) {
            return a + b;
          }, 0);
          if (countData && checkFloatNumber(countData)) {
            countData = Math.round(countData * 100) / 100;
          }
          const serviceDbObj = serviceDashBoardListData?.find((item) => item.refDBId === refDBId) || {};
          console.log(serviceDbObj);
          console.log(graphGroupByKeys);
          let graphInfoObj = {};
          if (serviceDbObj !== undefined && Object.keys(serviceDbObj).length > 0) {
            graphInfoObj = {
              id: refDBId,
              loading: false,
              // eslint-disable-next-line no-unneeded-ternary
              isDateKey: response?.data?.data?.date !== undefined ? true : false,
              title: response?.data?.data?.displayLabel || '',
              sData: bizAccountServiceList.bizAccountServiceList[serviceDbObj.onType] || {},
              count: countData,
              res: response?.data?.data,
              lookups: response?.data?.data?.lookups !== undefined ? response?.data?.data?.lookups : undefined,
              graphType: response?.data?.data?.type,
              measType: response?.data?.data?.aggregatedBy,
              iconUrl: serviceDbObj.dbIconUrl,
            };
          }
          console.log(graphInfoObj);
          prepareGraphData(
            graphLabelData,
            graphData,
            refDBId,
            graphType,
            response?.data?.data?.displayLabel,
            dimLabel,
            measLabel,
            response?.data?.data?.date,
            graphGroupByData,
            graphGroupByKeys,
            response?.data?.data?.type,
            graphInfoObj,
          );
        }
      }
    } catch (error) {
      console.log('DASHBOARD ERROR {} : ', error);
      // Handle any errors that occur during the process
    }
  };

  const fetchDashboardDataById = async () => {
    try {
      const response = await getDashboardListByIds(refDashBoardIds.toString());
      const res = response?.data;
      if (res.statusCode === 0) {
        const updatedGraphDashboardIds = [];
        const updatedDataModeIds = [];
        const graphInfoObject = [];

        for (const dbObj of res.data) {
          const serviceData = bizAccountServiceList.bizAccountServiceList[dbObj.onType] || {};

          if (dbObj && serviceData.state === 'ACTIVE') {
            const sData = bizAccountServiceList.bizAccountServiceList[dbObj.onType] || {};

            const listObj = {
              refDBId: dbObj?.id,
              name: dbObj?.displayLabel,
              onType: dbObj?.onType,
              dimFieldId: dbObj?.graphInfo?.dimFieldId || undefined,
              groupFieldId: dbObj?.graphInfo?.groupFieldId !== undefined ? dbObj?.graphInfo?.groupFieldId : undefined,
              dbIconUrl:
                dbObj?.iconUrl && dbObj?.iconUrl !== undefined && dbObj?.iconUrl !== ''
                  ? dbObj?.iconUrl
                  : sData?.iconUrl,
            };

            serviceDashBoardListData.push(listObj);

            if (dbObj.type && dbObj.type !== 'DATA_MODE') {
              updatedGraphDashboardIds.push(dbObj.id);
            } else {
              updatedDataModeIds.push(dbObj.id);
            }
          }
        }

        setGraphDashboardIds(updatedGraphDashboardIds);
        setDataModeIds(updatedDataModeIds);
        // serviceDashBoardListData.push(graphInfoObject);

        return { updatedGraphDashboardIds, updatedDataModeIds, graphInfoObject };
      } else {
        showWarningMessageAlert(res?.statusMessage);
      }
    } catch (error) {
      console.log('API CALL ERROR: ', error);
    }

    return {
      updatedGraphDashboardIds: [],
      updatedDataModeIds: [],
      graphInfoObject: [],
    };
  };

  useEffect(() => {
    async function fetchData() {
      setDashboardData([]);
      // setServiceDashBoardListData([]);
      setDataModeData([]);
      setDataModeIds([]);
      setGraphDashboardIds([]);
      setGraphGroupByTotal();

      if (refDashBoardIds && refDashBoardIds.length > 0) {
        const { updatedGraphDashboardIds, updatedDataModeIds } = await fetchDashboardDataById();
        // setServiceDashBoardListData(graphInfoObject);

        // data modes api calling and preparing data.
        if (updatedDataModeIds.length > 0) {
          for (const refId of updatedDataModeIds) {
            // eslint-disable-next-line no-await-in-loop
            await executeDataModeServiceDashboardById(refId, fromDate, toDate);
          }
        }

        // graph mode api calling and preparing the data.
        if (updatedGraphDashboardIds.length > 0) {
          for (const refId of updatedGraphDashboardIds) {
            setGraphGroupByTotal((previousData) => ({
              ...previousData,
              [refId]: {},
            }));
            // eslint-disable-next-line no-await-in-loop
            await fetchDashboardData(refId, fromDate, toDate);
          }
        }
      }
    }

    fetchData();
  }, [fromDate, toDate, date]);

  const getDateArray = (start, end) => {
    if (mode === 'YEAR') {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }
    if (mode === 'LAST_YEAR') {
      return Array.from({ length: 12 }, (_, i) => {
        return moment(start).add(i, 'months').format('MMM');
      });
    }
    const finalDatesArray = [];
    const arr = [];
    const dt = new Date(start);
    const endDate = new Date(end);
    while (dt <= endDate) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    arr.forEach((val) => {
      const day = moment(val).format('YYYY-MM-DD');
      finalDatesArray.push(day);
    });
    return finalDatesArray;
  };
  // making the graph Options
  const checkFloatNumber = (n) => {
    return Number(n) === n && n % 1 !== 0;
  };
  // get percentage value for graph while hover the graph
  function getPercentage(graphData, index) {
    let totalCount = 0;
    let percent = 0;
    graphData?.datasets[0]?.data.forEach((item) => {
      if (typeof item === 'number') {
        totalCount += item;
      }
    });
    // eslint-disable-next-line no-unsafe-optional-chaining
    percent = (graphData?.datasets[0]?.data[index] / totalCount) * 100;
    return percent.toFixed(2);
  }
  // get percentage value for graph while hover the graph
  function getIndividualVal(graphData, index) {
    let totalCount = 0;
    if (graphData && graphData.datasets && graphData.datasets[0] && graphData.datasets[0].data) {
      totalCount = graphData.datasets[0].data[index];
    }
    return totalCount;
  }
  // coma sepaterd value
  function getCommaSeparatedValues(input) {
    if (typeof input === 'number' && typeof input !== 'undefined' && input !== null) {
      const result = input.toString().split('.');
      const lastThree = result[0].substring(result[0].length - 3);
      const otherNumbers = result[0].substring(0, result[0].length - 3);
      let output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
      if (result.length > 1) {
        output += `.${result[1]}`;
      }
      return output;
    }
    return 0;
  }
  // Include a dollar sign in the ticks
  function getFormatValues(value) {
    if (value > 9999) {
      const units = ['K', 'M', 'B', 'T'];
      const order = Math.floor(Math.log(value) / Math.log(1000));
      const unitname = units[order - 1];
      const num = Math.floor(value / 1000 ** order);
      // output number remainder + unitname
      return num + unitname;
    }
    let returnVal = value;
    if (checkFloatNumber(value)) {
      returnVal = Math.round(value * 100) / 100;
    }
    // return formatted original number
    return returnVal === 0 ? 'No data available' : returnVal;
  }
  // getting totals for showing the data on graph center.
  function getSum(total, num) {
    if (typeof num === 'number') {
      return total + num;
    }
    return total;
  }
  const prepareGraphOptions = (
    graphLabelData,
    graphData,
    refDBId,
    graphType,
    displayLabel,
    dimLabel,
    measLabel,
    dateKey,
    graphGroupData,
    graphGroupByKeys,
    resGraphType,
  ) => {
    console.log('graphLabelData:', graphLabelData);
    console.log('graphData:', graphData);
    console.log('refDBId:', refDBId);
    console.log('graphType:', graphType);
    console.log('displayLabel:', displayLabel);
    console.log('dimLabel:', dimLabel);
    console.log('measLabel:', measLabel);
    console.log('dateKey:', dateKey);
    console.log('graphGroupData:', graphGroupData);
    console.log('graphGroupByKeys:', graphGroupByKeys);
    console.log('resGraphType:', resGraphType);
    const graphOptions =
      graphType === 'bar' || graphType === 'line'
        ? {
            responsive: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    fontSize: 10,
                    fontWeight: 400,
                    fontColor: 'rgb(159, 159, 159)',
                    fontFamily: 'roboto',
                    // eslint-disable-next-line no-unused-vars
                    callback(value, index, values) {
                      if (value > 9999) {
                        const units = ['K', 'M', 'B', 'T'];
                        const order = Math.floor(Math.log(value) / Math.log(1000));
                        const unitname = units[order - 1];
                        const num = Math.floor(value / 1000 ** order);
                        return num + unitname;
                      }
                      return value;
                    },
                  },
                  scaleLabel: {
                    display: true,
                    labelString: measLabel,
                    fontSize: 12,
                    fontWeight: 900,
                    fontColor: '#384d48',
                    fontFamily: 'roboto',
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    fontSize: 10,
                    fontColor: '#000000',
                    fontWeight: 400,
                    fontFamily: 'roboto',
                  },
                  afterTickToLabelConversion(data) {
                    const xLabels = data.ticks;
                    xLabels.forEach(function (label, i) {
                      xLabels[i] = label.length > 10 ? `${label.substring(0, 10)}...` : label;
                    });
                  },
                  scaleLabel: {
                    display: true,
                    labelString: dimLabel,
                    fontSize: 12,
                    fontWeight: 900,
                    fontColor: '#384d48',
                    fontFamily: 'roboto',
                  },
                },
              ],
            },
            plugins: {
              datalabels: {
                display: !(dateKey && mode === 'MONTH'),
                align: 'center',
                anchor: 'center',
                color: '#ffffff',
                font: {
                  weight: 'bold',
                  size: 12,
                },
                rotation: '-90',
                formatter(value, context) {
                  if (value > 9999) {
                    const units = ['K', 'M', 'B', 'T'];
                    const order = Math.floor(Math.log(value) / Math.log(1000));
                    const unitname = units[order - 1];
                    const num = Math.floor(value / 1000 ** order);
                    // eslint-disable-next-line no-return-assign
                    return (context.chart.data[context.dataIndex] = num + unitname);
                  }
                  // eslint-disable-next-line no-return-assign
                  return (context.chart.data[context.dataIndex] = value);
                },
                display(context) {
                  return context.dataset.data[context.dataIndex] !== 0;
                },
              },
            },
            tooltips: {
              backgroundColor: '#ffffff',
              bodyFontColor: '#384d48',
              caretSize: 5,
              borderColor: '#384d48',
              borderWidth: 1,
              cornerRadius: 2,
              xPadding: 10,
              yPadding: 10,
              bodyFontSize: 14,
              bodyFontStyle: 'bold',
              callbacks: {
                label(tooltipItem, data) {
                  const percentValue = getPercentage(data, tooltipItem.index);
                  const totalVal = getIndividualVal(data, tooltipItem.index);
                  return `${data.labels[tooltipItem.index]} : ${totalVal} (${percentValue}%)`;
                },
              },
            },
            legend: {
              display: false,
              position: 'right',
              fontFamily: 'roboto',
              labels: {
                fontColor: 'rgb(159, 159, 159)',
                fontSize: 10,
                boxWidth: 5,
                fontWeight: 400,
              },
            },
            // onClick (e) {
            //     const activePoints = Chart.getElementsAtEvent(e);
            //     if (activePoints.length > 0) {
            //         // eslint-disable-next-line no-underscore-dangle
            //         const selectedIndex = activePoints[0]._index;
            //         // eslint-disable-next-line react/no-this-in-sfc
            //         const selectedLabel = this.data.labels[selectedIndex];
            //         // eslint-disable-next-line no-underscore-dangle
            //         const dashboardId = activePoints[0]._chart.canvas.id;
            //         getTxnFilterDataByDashboardId(dashboardId, selectedLabel, fromDate, toDate, false);
            //     }
            // }
          }
        : {
            responsive: true,
            legend: {
              display: true,
              position: 'right',
              fontFamily: 'roboto',
              labels: {
                fontColor: '#384d48',
                fontSize: 11,
                boxWidth: 5,
                fontStyle: 'bold',
                generateLabels: (chart) => {
                  const { data } = chart;
                  if (data.labels.length && data.datasets.length) {
                    return data.labels.map((label, i) => {
                      const meta = chart.getDatasetMeta(0);
                      const ds = data.datasets[0];
                      const arc = meta.data[i];
                      const custom = (arc && arc.custom) || {};
                      const arcOpts = chart.options.elements.arc;
                      const fill = custom.backgroundColor
                        ? custom.backgroundColor
                        : (ds.backgroundColor && ds.backgroundColor[i]) || arcOpts.backgroundColor;
                      const stroke = custom.borderColor
                        ? custom.borderColor
                        : (ds.borderColor && ds.borderColor[i]) || arcOpts.borderColor;
                      const bw = custom.borderWidth
                        ? custom.borderWidth
                        : (ds.borderWidth && ds.borderWidth[i]) || arcOpts.borderWidth;
                      // eslint-disable-next-line no-underscore-dangle
                      const value = chart.config.data.datasets[arc._datasetIndex].data[arc._index];
                      if (arc._index < 8) {
                        return {
                          text:
                            label.length > 15
                              ? `${label.substring(0, 15)}...`
                              : `${label} (${getCommaSeparatedValues(value)})`,
                          fillStyle: fill,
                          strokeStyle: stroke,
                          lineWidth: bw,
                          hidden: typeof ds.data[i] !== 'number' || meta.data[i].hidden,
                          index: i,
                        };
                      }
                      if (arc._index === 8) {
                        return {
                          text: `+${data.labels.length - 7} More`,
                          fillStyle: '#ffffff',
                          strokeStyle: '#ffffff',
                          lineWidth: bw,
                          hidden: typeof ds.data[i] !== 'number' || meta.data[i].hidden,
                          index: i,
                        };
                      }
                      return {
                        text: '',
                        fillStyle: '#ffffff',
                        strokeStyle: '#ffffff',
                        lineWidth: bw,
                        hidden: meta.data[i].hidden,
                        index: i,
                      };
                    });
                  }
                  return [];
                },
              },
            },
            plugins: {
              datalabels: {
                display: true,
                align: 'center',
                anchor: 'center',
                color: '#ffffff',
                font: {
                  weight: 'bold',
                  size: 12,
                },
                formatter: (value, context) => {
                  if (value > 9999) {
                    const units = ['k', 'M', 'B', 'T'];
                    const order = Math.floor(Math.log(value) / Math.log(1000));
                    const unitname = units[order - 1];
                    const num = Math.floor(value / 1000 ** order);
                    // eslint-disable-next-line no-return-assign
                    return (context.chart.data[context.dataIndex] = num + unitname);
                  }
                  // eslint-disable-next-line no-return-assign
                  return (context.chart.data[context.dataIndex] = value);
                },
                display: (context) => {
                  return context.dataset.data[context.dataIndex] !== 0;
                },
              },
            },
            tooltips: {
              backgroundColor: '#ffffff',
              bodyFontColor: '#384d48',
              caretSize: 5,
              borderColor: '#384d48',
              borderWidth: 1,
              cornerRadius: 2,
              xPadding: 10,
              yPadding: 10,
              bodyFontSize: 14,
              bodyFontStyle: 'bold',
              custom: (tooltip) => {
                if (!tooltip) return;
                tooltip.displayColors = false;
              },
              callbacks: {
                label: (tooltipItem, data) => {
                  const percentValue = getPercentage(data, tooltipItem.index);
                  const totalVal = getIndividualVal(data, tooltipItem.index);
                  return `${data.labels[tooltipItem.index]} : ${totalVal} (${percentValue}%)`;
                },
                // eslint-disable-next-line no-unused-vars
                title: (tooltipItem, data) => {
                  // eslint-disable-next-line no-useless-return
                  return;
                },
              },
            },
            // onClick: (e, activePoints) => {
            //     const selectedIndex = activePoints[0]._index;
            //     const selectedLabel = chart.data.labels[selectedIndex];
            //     const dashboardId = activePoints[0]._chart.canvas.id;
            //     // Call your function here
            // },
            animation: {
              duration: 1,
              onComplete() {
                const { height } = this.chart;
                const { ctx } = this.chart;
                const fontSize = (height / 200).toFixed(2);
                this.chart.ctx.font = `bold ${fontSize}em Verdana`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#384d48';
                const centerX = (this.chart.controller.chartArea.left + this.chart.controller.chartArea.right) / 2;
                const centerY = (this.chart.controller.chartArea.top + this.chart.controller.chartArea.bottom) / 2;
                ctx.fillText(graphData.length > 0 && getFormatValues(graphData.reduce(getSum)), centerX, centerY);
              },
            },
          };

    console.log('HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII', resGraphType);
    if (resGraphType === 'STACKED_BAR_GRAPH' || resGraphType === 'STACKED_VERTICAL_GRAPH') {
      graphOptions.scales.yAxes[0].stacked = true;
      graphOptions.scales.xAxes[0].stacked = true;
      console.log('================================');
      console.log(graphGroupByTotal[refDBId] !== undefined);
      if (graphGroupByTotal[refDBId] !== undefined && Object.keys(graphGroupByTotal[refDBId]).length > 0) {
        graphOptions.tooltips = {
          mode: 'x',
          callbacks: {
            label(tooltipItem, data) {
              const corporation = data.datasets[tooltipItem.datasetIndex].label;
              const valor = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              const labelName = data.labels[tooltipItem.index];
              let total = graphGroupByTotal[refDBId][labelName]
                ? graphGroupByTotal[refDBId][labelName][corporation] || 0
                : 0;
              if (checkFloatNumber(total)) {
                total = total.toFixed(3);
              }
              // If it is not the last dataset, you display it as you usually do
              if (tooltipItem.datasetIndex !== data.datasets.length - 1) {
                return `${corporation} : ${valor} (${total})`;
              } // .. else, you display the dataset and the total, using an array
              return [`${corporation} : ${valor} (${total})`];
            },
          },
        };
      } else {
        graphOptions.tooltips = {
          mode: 'x',
        };
      }
      graphOptions.legend = {
        display: true,
        fontFamily: 'roboto',
        labels: {
          fontColor: '#384d48',
          fontSize: 11,
          boxWidth: 10,
          fontStyle: 'bold',
          padding: 25,
        },
      };
    } else if (resGraphType === 'STACKED_LINE_GRAPH') {
      graphOptions.scales.yAxes[0].stacked = false;
      graphOptions.scales.xAxes[0].stacked = false;
      graphOptions.plugins.datalabels.display = false;
      if (graphGroupByTotal[refDBId] && Object.keys(graphGroupByTotal[refDBId]).length > 0) {
        graphOptions.tooltips = {
          callbacks: {
            label(tooltipItem, data) {
              const corporation = data.datasets[tooltipItem.datasetIndex].label;
              const valor = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              const labelName = data.labels[tooltipItem.index];
              let total = graphGroupByTotal[refDBId][labelName]
                ? graphGroupByTotal[refDBId][labelName][corporation] || 0
                : 0;
              if (checkFloatNumber(total)) {
                total = total.toFixed(3);
              }
              // If it is not the last dataset, you display it as you usually do
              if (tooltipItem.datasetIndex !== data.datasets.length - 1) {
                return `${corporation} : ${valor} (${total})`;
              } // .. else, you display the dataset and the total, using an array
              return [`${corporation} : ${valor} (${total})`];
            },
          },
        };
      } else {
        graphOptions.tooltips = {};
      }
      graphOptions.legend = {
        display: true,
        fontFamily: 'roboto',
        labels: {
          fontColor: '#384d48',
          fontSize: 11,
          boxWidth: 10,
          fontStyle: 'bold',
          padding: 25,
        },
      };
    }
    return graphOptions;
  };

  return (
    <>
      {dashboardData?.length === 0 && dataModeInfo.length === 0 ? (
        <div className="spin">
          <Spin />
        </div>
      ) : (
        <>
          <Row gutter={[20, 20]}>
            {dataModeInfo?.map((elem, index) => {
              return (
                <Col span={6} key={`${elem?.id}-${index}`}>
                  <DataMode key={`${elem?.id}-${index}`} data={elem} />
                </Col>
              );
            })}
          </Row>

          <Row gutter={[4, 4]}>
            {dashboardData?.map((elem, index) => {
              return (
                <Col span={12} key={`${elem?.id}-${index}`}>
                  <Chart key={`${elem?.id}-${index}`} type={elem?.type} graphData={elem} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};
export default TxnDashboard;
TxnDashboard.propTypes = {
  mode: PropTypes.string,
  fromDate: PropTypes.string,
  toDate: PropTypes.string,
  businessId: PropTypes.string,
  date: PropTypes.string,
  refDashboardIds: PropTypes.any,
};
