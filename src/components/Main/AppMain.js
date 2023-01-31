import React, { useState, useEffect } from 'react';

import axios from 'axios'
import cheerio from 'cheerio'

import "assets/css/main.css"

function AppMain() {
  // 크롤링할 데이터를 담을 배열
  const [items, setItems] = useState([]);

  // 비동기 처리를 통해 웹페이지 크롤링
  async function getHTML() {
    const html = await axios.get(
      'https://datalab.labangba.com/recruit'
    );

    // tbody tr 태그에 있는 텍스트를 불러옴
    const $ = cheerio.load(html.data);
    const elements = $('.Table_table___jpMW tbody tr');

    const articleList = []

    // 불러온 텍스트를 담을 객체를 map method를 통해 생성
    elements.map(function (i, element) {
      const scrapingResult = {
        'idx': '',
        'title-main': '',
        'title-sub': '',
        'category': '',
        'date': '',
        'time': '',
        'views': '',
        'sold': '',
        'money': '',
        'goods': '',
        'link': ''
      }

      scrapingResult['idx'] = String($(element).find('td:nth-of-type(1)').text());
      scrapingResult['title-main'] =  String($(element).find('td:nth-of-type(2) a span:first-child').text());
      scrapingResult['title-sub'] =  String($(element).find('td:nth-of-type(2) a span:last-child').text());
      scrapingResult['category'] =  String($(element).find('td:nth-of-type(3) span').text());
      scrapingResult['date'] =  String($(element).find('td:nth-of-type(4) div span:first-child').text());
      scrapingResult['time'] =  String($(element).find('td:nth-of-type(4) div span:last-child').text());
      scrapingResult['views'] =  String($(element).find('td:nth-of-type(5)').text());
      scrapingResult['sold'] =  String($(element).find('td:nth-of-type(6)').text());
      scrapingResult['money'] =  String($(element).find('td:nth-of-type(7)').text());
      scrapingResult['goods'] =  String($(element).find('td:nth-of-type(8)').text());
      scrapingResult['link'] =  String($(element).find('td:nth-of-type(2) a').attr('href'));

      articleList.push(scrapingResult)
    })

    return articleList
  }

  const getResult = getHTML()

  useEffect(() => {
    getResult.then((res) => {
      setItems(res)
    })
  }, []);

  const rendering = () => {
    const results = []
    for (let i = 0; i < items.length; i++) {
      results.push(i)
    }
    return results
  }

  const numbers = rendering()

  return (
    <div className="main-content">
      <div>
        <div className="main-title">
          <div className="main-title-top">
            <span>라방 랭킹</span>
            <i className="styles_tooltip__AalJo"></i>
          </div>
          <p>72시간 동안 가장 매출액 높은 라이브방송</p>
        </div>
        <table>
          <thead>
            <tr>
              <th width="4%">
              </th>
              <th width="31%">
                방송정보
              </th>
              <th width="12%">
                분류
              </th>
              <th width="12.5%">
                방송시간
              </th>
              <th width="10%">
                조회수
              </th>
              <th width="10%">
                판매량
              </th>
              <th width="12.5%">
                매출액
              </th>
              <th width="8%">
                상품수
              </th>
            </tr>
          </thead>

          <tbody>
            {numbers.map((idx, number) => (
              <tr key={idx}>
                <td>
                  <div className="main-table-idx">
                    {items[number]['idx']}
                  </div>
                </td>
                <td>
                  <a href={'https://datalab.labangba.com/' + items[number]['link']} target="_blank" className="main-table-title">
                    <span>{items[number]['title-main']}</span>
                    <span>{items[number]['title-sub']}</span>
                  </a>
                </td>
                <td>
                  {items[number]['category']}
                </td>
                <td>
                  <div className="main-table-time">
                    <span>
                      {items[number]['date']}
                    </span>
                    <span>
                      {items[number]['time']}
                    </span>
                  </div>
                </td>
                <td>
                  {items[number]['views']}
                </td>
                <td>
                  {items[number]['sold']}
                </td>
                <td>
                  {items[number]['money']}
                </td>
                <td>
                  {items[number]['goods']}
                </td>
              </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppMain;