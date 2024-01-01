module NewsHelper

    def getQuery(text, after, before, interval)
        return {
            'size': 0,
            'aggs': {
                'by_date': {
                    'date_histogram': {
                        'field': 'timestamp',
                        'fixed_interval': interval
                    },
                    'aggs': {
                        'by_medium': {
                            'terms': {
                                'field': 'medium'
                            }
                        }
                    }
                }
            },
            'query': {
                'bool': {
                    'must': [
                        { 'match': { 'text': text } },
                    ],
                    "filter": [
                        {
                            "range": {
                                "timestamp": {
                                    'gte': after,
                                    'lte': before
                                }
                            }
                        }
                    ]
                }
            }
        }
    end
end




