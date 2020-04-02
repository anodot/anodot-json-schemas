'use strict';

const dateRangeValueSchema = {
    'id': '#DateRangeValue',
    'type': 'object',
    'required': ['constRange'],
    'properties': {
        'constRange': {'type': 'string'},
        'dateText': {'type': 'string'},
        'shortText': {'type': 'string'},
        'startDate': {'type': ['integer', 'string']},
        'endDate': {'type': ['integer', 'string']},
    }
};

const expressionSchema = {
    'id': '#Expression',
    'type' : 'object',
    'properties': {
        'value': {'type': 'string'},
        'key': {'type': 'string'},
        'type': {'type': 'string'},
    }
}

const timeRangeSchema = {
    'id': '#TimeRange',
    'type': 'object',
    'required': ['id', 'name', 'type', 'selectedValue'],
    'properties': {
        'id': {'type': 'string'},
        'name': {'type': 'string'},
        'type': {'type': 'string'},
        'dependencyGroup': {
            'type': 'object',
            'required': ['value', 'text'],
            'properties': {
                'value': { 'type' : 'string' },
                'text': { 'type' : 'string' },
            }
        },
        'selectedValue': {'$ref': '#DateRangeValue' }
    }
};

const eventsFilterPresetSchema = {
    'id': '#EventsFilterPreset',
    'type': 'object',
    'required': ['id', 'name'],
    'properties': {
        'id': {'type': 'string'},
        'name': {'type': 'string'},
        'aggregation': {
            'type': 'object',
            'required': ['topEventSize', 'resolution', 'aggregationField'],
            'properties': {
                'maxBuckets': { 'type' : 'integer' },
                'topEventSize': { 'type' : 'integer' },
                'resolution': { 'type' : 'null' },
                'aggregationField': { 'type' : 'null' },
            }
        },
        'filter': {
            'type': 'object',
            'required': ['q', 'categories'],
            'properties': {
                'q': {
                    'type': 'object',
                    'required': ['expression'],
                    'properties': {
                        'expression': {
                            'type': 'array',
                            'items': {'$ref': '#Expression'}
                        },
                    }
                },
                'categories': { 'type' : 'array' },
            }
        }
    }
};

const eventsFilterSchema = {
    'id': '#EventsFilter',
    'type': 'object',
    'required': ['current', 'presets'],
    'properties': {
        'shouldShowEvents': {'type': 'boolean'},
        'current': {
            'type': 'object',
            'properties': {
                'id': { 'type' : 'string' },
            }
        },
        'presets': {
            'type': 'array',
            'items': {'$ref': '#EventsFilterPreset'}
        }
    }
};

const selectorSchema = {
    'id': '#Selector',
    'type': 'object',
    'required': ['id', 'name', 'selectedValue', 'expressions'],
    'properties': {
        'id': {'type': 'string'},
        'name': {'type': 'string'},
        'dependencyGroup': {
            'type': 'object',
            'required': ['id', 'text'],
            'properties': {
                'id': { 'type' : 'string' },
                'text': { 'type' : 'string' },
            }
        },
        'selectedValue': {
            'type': 'object',
            'required': ['name', 'value'],
            'properties': {
                'name': { 'type' : 'string' },
                'value': { 'type' : 'string' },
                'isAll': { 'type' : 'boolean' },
            }
        },
        'expressions': {
            'type': 'array',
            'items': { '$ref': '#Expression' }
        }
    }
};

const colorSchema = {
    'id': '#Color',
    'type': 'object',
    'properties': {
        'text': { 'type' : 'string' },
        'hex': { 'type' : 'string' },
    }
};

const andtGaugeDisplayPropertiesSchema = {
    'id': '#GaugeDisplayProperties',
    'type': 'object',
    'properties': {
        'type': { 'type' : 'string' },
        'thresholdColorElement': { 'type' : 'string'},
        'orientation': { 'type' : 'string' },
        'suffix': {
            'type': 'object',
            'properties': {
                'fontSize': { 'type' : 'integer' },
                'text': { 'type' : 'string' },
            }
        },
        'prefix': {
            'type': 'object',
            'properties': {
                'fontSize': { 'type' : 'integer' },
                'text': { 'type' : 'string' },
            }
        },
        'mainValue': {
            'type': 'object',
            'properties': {
                'fontSize': { 'type' : 'integer' },
                'decimalPlaces': { 'type' : 'integer' },
                'unitText': { 'type' : 'string' },
                'thousandsSeparator': { 'type' : 'boolean' },
                'abbreviate': { 'type' : 'boolean' },
            }
        },
        'defaultColor': { '$ref': '#Color' },
        'thresholds': {
            'type': 'array',
            'maxItems': 3,
            'items': {
                'type': 'object',
                'properties': {
                    'operator': { 'type' : 'string' },
                    'value': { 'type' : 'string' },
                    'order': { 'type' : 'integer' },
                    'color': { '$ref': '#Color' },
                }
            }
        }
    }
};

const yAxisDisplayPropertiesSchema = {
    'id': '#yAxisDisplayProperties',
    'type': 'object',
    'properties': {
        'type': { 'type' : 'string' },
        'min': { 'type' : ['number', 'null']},
        'max': { 'type' : ['number', 'null'] },
        'opposite': { 'type' : 'boolean' },
    }
};

const displayPropertiesSchema = {
    'id': '#DisplayProperties',
    'type': 'object',
    'properties': {
        'all': {
            'type': 'object'
        },
        'byTreeExp': {
            'type': 'array',
            'items': {
                'type': 'object',
                'required': ['id'],
                'properties': {
                    'id': { 'type' : 'string' },
                    'options': {
                        'type': 'object',
                        'properties': {
                            'type': { 'type' : 'string' },
                            'stacking': { 'type' : ['string', 'null']},
                            'andtGauge': { '$ref' : '#GaugeDisplayProperties' },
                            'yAxis': { '$ref': '#yAxisDisplayProperties' },
                        }
                    },
                }
            }
        }
    }
};

const lineChartSchema = {
    'id': '#LineChartTile',
    'type': 'object',
    'required': ['gridster', 'expressionTrees'],
    'properties': {
        'height': {'type': 'integer'},
        'gridster': {
            'type': 'object'
        },
        'resolution': {
            'type': ['object', 'null'],
            'properties': {
                'value': {'type': 'string'}
            }
        },
        'eventListeners': {
            'type': 'object'
        },
        'seriesProperties': {
            'type': 'object'
        },
        'expressionTrees': {
            'type': 'object'
        },
        'legend': {
            'type': 'object'
        },
    },
};

const andtGaugeSchema = {
    'id': '#GaugeTile',
    'type': 'object',
    'required': ['gridster' ,'displayProperties', 'expressionTrees'],
    'properties': {
        'gridster': {
            'type': 'object'
        },
        'resolution': {
            'type': ['object', 'null'],
            'properties': {
                'value': {'type': 'string'}
            }
        },
        'eventListeners': {
            'type': 'object'
        },
        'displayProperties': {
            'type': 'object'
        },
        'expressionTrees': {
            'type': 'object'
        },
    },
};

const dashboardTileSchema = {
    'id': '#DashboardTile',
    'type': 'object',
    'required': ['id', 'sizeX', 'sizeY'],
    'properties': {
        'id': {'type': 'string'},
        'sizeX': {'type': 'integer'},
        'sizeY': {'type': 'integer'},
        'row': {'type': 'number'},
        'col': {'type': 'number'},
        'title': {
            'type': ['string', 'object'],
            'properties': {
                'text': {'type': 'string'},
            }
        },
        'lineChart': {'$ref': '#LineChartTile'},
        'andtGauge': {'$ref': '#GaugeTile'},
        'freeText': {
            'type': 'object',
            'required': ['text', 'type', 'class'],
            'properties': {
                'text': {'type': 'string'},
                'type': {'type': 'string'},
                'class': {'type': 'string'},
            }
        }
    },
    'oneOf' : [
        {'required': ['lineChart']},
        {'required': ['andtGauge']},
        {'required': ['freeText']},
    ]
};

const dashboardSchema = {
    'id': '#Dashboard',
    'type': 'object',
    'required': ['name', 'autoRefreshInterval','tags' ,'dateRange', 'tiles'],
    'properties': {
        'name': {'type': 'string'},
        'autoRefreshInterval': {'type': 'integer'},
        'star': {
            'type': 'array',
            'items': { 'type' : 'string' },
            'additionalItems': { 'type' : 'string' }
        },
        'editableBy': {
            'type': 'array',
            'items': { 'type' : 'string' },
            'additionalItems': { 'type' : 'string' }
        },
        'tileAlerts': {
            'type': 'array',
            'items': { 'type' : 'string' },
            'additionalItems': { 'type' : 'string' }
        },
        'tags': {
            'type': 'array',
            'items': {
                'type' : 'object',
                'properties': {
                    'display': {'type': 'string'},
                    'id': {'type': 'string'},
                }
            }
        },
        'dateRange': {'$ref': '#DateRangeValue'},
        'eventsFilter': {'$ref': '#EventsFilter'},
        'selectorsFilter': {
            'type': 'object',
            'required': ['selectors'],
            'properties': {
                'selectors': {
                    'type': 'array',
                    'items': {'$ref': '#Selector'}
                },
            }
        },
        'timeRangesFilter': {
            'type': 'object',
            'required': ['timeRanges'],
            'properties': {
                'timeRanges': {
                    'type': 'array',
                    'items': {'$ref': '#TimeRange'}
                },
            }
        },
        'tiles': {
            'type': 'array',
            'items': {'$ref': '#DashboardTile'}
        }
    }
};

module.exports = {
    dateRangeValueSchema,
    expressionSchema,
    timeRangeSchema,
    eventsFilterPresetSchema,
    eventsFilterSchema,
    selectorSchema,
    colorSchema,
    andtGaugeDisplayPropertiesSchema,
    yAxisDisplayPropertiesSchema,
    displayPropertiesSchema,
    lineChartSchema,
    andtGaugeSchema,
    dashboardTileSchema,
    dashboardSchema,
};
