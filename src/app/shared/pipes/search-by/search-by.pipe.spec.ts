import { SearchByPipe } from './search-by.pipe';

describe('SearchByPipe', () => {
  let pipe: SearchByPipe;
  const testCourses = [
    {
      id: '1',
      title: 'Test Course1',
      creationDate: new Date('01/05/2019'),
      duration: 120,
      description: 'Course description',
      topRated: false,
    },
    {
      id: '2',
      title: 'Test Course2',
      creationDate: new Date('01/02/2018'),
      duration: 10,
      description: 'Course description',
      topRated: false,
    },
    {
      id: '3',
      title: 'Test Course3',
      creationDate: new Date('11/20/2018'),
      duration: 140,
      description: 'Course description',
      topRated: true,
    },
  ];

  beforeEach(() => {
    pipe = new SearchByPipe();

  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should find courses by title', () => {
    let searchValue = 'Course2';
    let expectedCourses = [
      {
        id: '2',
        title: 'Test Course2',
        creationDate: new Date('01/02/2018'),
        duration: 10,
        description: 'Course description',
        topRated: false,
      },
    ];
    expect(pipe.transform(testCourses, 'title', searchValue)).toEqual(expectedCourses);
    searchValue = 'test';
    expectedCourses = [
      {
        id: '1',
        title: 'Test Course1',
        creationDate: new Date('01/05/2019'),
        duration: 120,
        description: 'Course description',
        topRated: false,
      },
      {
        id: '2',
        title: 'Test Course2',
        creationDate: new Date('01/02/2018'),
        duration: 10,
        description: 'Course description',
        topRated: false,
      },
      {
        id: '3',
        title: 'Test Course3',
        creationDate: new Date('11/20/2018'),
        duration: 140,
        description: 'Course description',
        topRated: true,
      },
    ];
    expect(pipe.transform(testCourses, 'title', searchValue)).toEqual(expectedCourses);
  });
});
