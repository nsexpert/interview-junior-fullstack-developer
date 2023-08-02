import { Injectable } from '@nestjs/common';
const cities = require('../../cities.json');

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  postSearch(data: any): any {
    var keyword = data.keyword;
    var page = data.page;
    let resultAll = cities.filter((city: any) => {
      return city.cityName.includes(keyword);
    })

    //pagination
    let resultForPage = resultAll.slice((page - 1) * 5, page * 5);

    return {
      cities: resultForPage,
      maxPage: Math.ceil(resultAll.length / 5)
    };
  }
}
