import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;
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
    pipe = new OrderByPipe();

  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort data by creation date', () => {
    const expectedCourses = [
      {
        id: '1',
        title: 'Test Course1',
        creationDate: new Date('01/05/2019'),
        duration: 120,
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
      {
        id: '2',
        title: 'Test Course2',
        creationDate: new Date('01/02/2018'),
        duration: 10,
        description: 'Course description',
        topRated: false,
      },
    ];
    expect(pipe.transform(testCourses, 'creationDate')).toEqual(expectedCourses);
  });

  it('should nothing change', () => {
    expect(pipe.transform(testCourses, 'test')).toBeFalsy();
  });
});
