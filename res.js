// responses of Api

{
    "data": {
        "took": 1,
        "timed_out": false,
        "_shards": {
            "total": 5,
            "successful": 5,
            "skipped": 0,
            "failed": 0
        },
        "hits": {
            "total": 8,
            "max_score": 0,
            "hits": []
        },
        "aggregations": {
            "x": {
                "buckets": [
                    {
                        "key_as_string": "Feb",
                        "key": 1643673600000,
                        "doc_count": 3,
                        "groupBy": {
                            "doc_count_error_upper_bound": 0,
                            "sum_other_doc_count": 0,
                            "buckets": [
                                {
                                    "key": "choice1",
                                    "doc_count": 1
                                },
                                {
                                    "key": "choice2",
                                    "doc_count": 1
                                },
                                {
                                    "key": "choice3",
                                    "doc_count": 1
                                }
                            ]
                        }
                    },
                    {
                        "key_as_string": "Mar",
                        "key": 1646092800000,
                        "doc_count": 2,
                        "groupBy": {
                            "doc_count_error_upper_bound": 0,
                            "sum_other_doc_count": 0,
                            "buckets": [
                                {
                                    "key": "221",
                                    "doc_count": 1
                                },
                                {
                                    "key": "330",
                                    "doc_count": 1
                                }
                            ]
                        }
                    },
                    {
                        "key_as_string": "Apr",
                        "key": 1648771200000,
                        "doc_count": 0,
                        "groupBy": {
                            "doc_count_error_upper_bound": 0,
                            "sum_other_doc_count": 0,
                            "buckets": []
                        }
                    },
                    {
                        "key_as_string": "May",
                        "key": 1651363200000,
                        "doc_count": 1,
                        "groupBy": {
                            "doc_count_error_upper_bound": 0,
                            "sum_other_doc_count": 0,
                            "buckets": [
                                {
                                    "key": "110",
                                    "doc_count": 1
                                }
                            ]
                        }
                    },
                    {
                        "key_as_string": "Jun",
                        "key": 1654041600000,
                        "doc_count": 1,
                        "groupBy": {
                            "doc_count_error_upper_bound": 0,
                            "sum_other_doc_count": 0,
                            "buckets": [
                                {
                                    "key": "110",
                                    "doc_count": 1
                                }
                            ]
                        }
                    },
                    {
                        "key_as_string": "Jul",
                        "key": 1656633600000,
                        "doc_count": 0,
                        "groupBy": {
                            "doc_count_error_upper_bound": 0,
                            "sum_other_doc_count": 0,
                            "buckets": []
                        }
                    },
                    {
                        "key_as_string": "Aug",
                        "key": 1659312000000,
                        "doc_count": 0,
                        "groupBy": {
                            "doc_count_error_upper_bound": 0,
                            "sum_other_doc_count": 0,
                            "buckets": []
                        }
                    },
                    {
                        "key_as_string": "Sep",
                        "key": 1661990400000,
                        "doc_count": 0,
                        "groupBy": {
                            "doc_count_error_upper_bound": 0,
                            "sum_other_doc_count": 0,
                            "buckets": []
                        }
                    },
                    {
                        "key_as_string": "Oct",
                        "key": 1664582400000,
                        "doc_count": 0,
                        "groupBy": {
                            "doc_count_error_upper_bound": 0,
                            "sum_other_doc_count": 0,
                            "buckets": []
                        }
                    },
                    {
                        "key_as_string": "Nov",
                        "key": 1667260800000,
                        "doc_count": 0,
                        "groupBy": {
                            "doc_count_error_upper_bound": 0,
                            "sum_other_doc_count": 0,
                            "buckets": []
                        }
                    },
                    {
                        "key_as_string": "Dec",
                        "key": 1669852800000,
                        "doc_count": 1,
                        "groupBy": {
                            "doc_count_error_upper_bound": 0,
                            "sum_other_doc_count": 0,
                            "buckets": [
                                {
                                    "key": "330",
                                    "doc_count": 1
                                }
                            ]
                        }
                    }
                ]
            }
        },
        "displayLabel": "test",
        "id": "64df6244a2bcf20347d062c6",
        "dimLabel": "x-axis",
        "measLabel": "y-axis",
        "type": "STACKED_BAR_GRAPH",
        "aggregatedBy": "COUNT",
        "date": true
    },
    "statusCode": 0,
    "statusMessage": "SUCCESS"
}
