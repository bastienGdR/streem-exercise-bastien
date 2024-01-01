ES_PASSSWORD='streem'
ES_USERNAME='candidate'

$client = Elasticsearch::Client.new(
            url: 'https://sample.es.streem.com.au',
            user: ES_USERNAME,
            password: ES_PASSSWORD,
            log: true
        )