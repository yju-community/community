import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { PostCategories } from '../../entities/PostCategories';
import { Majors } from '../../entities/Majors';
import { ReportCategories } from '../../entities/ReportCategories';
import { Rooms } from '../../entities/Rooms';
import { GroupCategories } from '../../entities/GroupCategories';
import { Groups } from '../../entities/Groups';

export class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(PostCategories)
      .values([
        { name: '과팅 모집' },
        { name: '스터디 모집' },
        { name: '운동 모집' },
      ])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(GroupCategories)
      .values([{ name: '소개팅' }, { name: '스터디' }, { name: '운동' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Groups)
      .values([
        { categoryId: 1, name: '2WDJ' },
        { categoryId: 1, name: '2CPJ' },
        { categoryId: 1, name: '1WDJ' },
        { categoryId: 1, name: '1CPJ' },
        { categoryId: 1, name: '3WDJ' },
        { categoryId: 1, name: '3CPJ' },
      ])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Rooms)
      .values([{ name: '2WDJ' }, { name: '2CPJ' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Majors)
      .values([
        { name: '컴퓨터정보계열' },
        { name: '컴퓨터응용기계계열' },
        { name: 'ICT반도체전자계열' },
        { name: '신재생에너지전기계열' },
        { name: '건축인테리어디자인계열' },
        { name: '부사관계열' },
        { name: '컨텐츠디자인과' },
        { name: '드론항공전자과' },
        { name: '경영회계서비스계열' },
        { name: '호텔항공관광과' },
        { name: '사회복지과' },
        { name: '유아교육과' },
        { name: '보건의료행정과' },
        { name: '간호학과' },
      ])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(ReportCategories)
      .values([
        { name: '불법성 게시물' },
        { name: '음란성 게시물' },
        { name: '개인정보 노출 게시물' },
        { name: '저작권 침해 게시물' },
        { name: '홍보성 게시물' },
        { name: '비방/비하/욕설 게시물' },
        { name: '불법상품판매 게시물' },
        { name: '불법촬영물 등' },
        { name: '기타' },
        { name: '버그 신고' },
      ])
      .execute();
  }
}

/*
2022년도 계열들
await connection
      .createQueryBuilder()
      .insert()
      .into(Majors)
      .values([
        { id: 1, name: '컴퓨터정보계열' },
        { id: 2, name: 'AI융합계열' },
        { id: 3, name: '반도체계열' },
        { id: 4, name: '전자정보계열' },
        { id: 5, name: '신재생에너지전기계열' },
        { id: 6, name: '건축공학과' },
        { id: 7, name: '인테리어디자인과' },
        { id: 8, name: '국방군사계열' },
        { id: 9, name: '콘텐츠디자인과' },
        { id: 10, name: '무인항공드론과' },
        { id: 11, name: '경영회계서비스계열' },
        { id: 12, name: '호텔항공관광과' },
        { id: 13, name: '사회복지과' },
        { id: 14, name: '유아교육과' },
        { id: 15, name: '간호학과' },
        { id: 16, name: '보건의료행정과' },
        { id: 17, name: '펫케어과' },
        { id: 18, name: '조리제과제빵과' },
        { id: 19, name: '만화애니메이션과' },
        { id: 20, name: '뷰티융합과' },
      ])
      .execute();
*/
