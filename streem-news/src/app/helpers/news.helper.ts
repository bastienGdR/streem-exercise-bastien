import { INews, MediumType } from "../app.component";

export class NewsHelper {
    public static transformESResponseToData(res: any): INews[] {
        const bucketByDate = res.aggregations.by_date.buckets;
        const news: INews[] = bucketByDate.map((bucket: any)=>{
            return {
                date: bucket.key_as_string,
                mediumBuckets: bucket.by_medium.buckets.map((bucket: any)=>{
                    return {
                        docCount: bucket.doc_count,
                        key: bucket.key,
                    }
                })
            }
        })
        return news
    }

    public static getChartConfig(news: INews[]) {
        const size = news.length;
        const mediumLabelToData = {
            [MediumType.SOCIAL]: {
                data: Array(size).fill(0),
                backgroundColor: '#CA8EAE',
            },
            [MediumType.PRINT]: {
                data: Array(size).fill(0),
                backgroundColor: '#9170B8',
            },
            [MediumType.ONLINE]: {
                data: Array(size).fill(0),
                backgroundColor: '#D36086',
            },
            [MediumType.TV]: {
                data: Array(size).fill(0),
                backgroundColor: '#6092C0',
            },
            [MediumType.RADIO]: {
                data: Array(size).fill(0),
                backgroundColor: '#54B399',
            },
        };
        const dateLabel = Array(size).fill('');
        news.forEach((newsByPeriod, i)=>{
            dateLabel[i]=this.convertDateForChart(newsByPeriod.date)
            newsByPeriod.mediumBuckets.forEach((medium)=>{
                mediumLabelToData[medium.key].data[i]=medium.docCount
            })
        })

        return {
            labels:dateLabel,   
            datasets: Object.entries(mediumLabelToData).map(([medium, value])=>{return {
                label: medium,
                ...value,
            }})
       };
    }

    public static convertDateForChart(date: string): string {
        const dateObject = new Date(date);
        return dateObject.toISOString().slice(0, 10);
    }
}