import { findInfoById, getLastIdx } from "../src/components/ResultSection";

const dummyCat = [
    { id: "1", name: "a" },
    { id: "2", name: "b" },
    { id: "3", name: "c" },
    { id: "4", name: "d" },
    { id: "5", name: "e" },
    { id: "6", name: "f" },
    { id: "7", name: "g" },
    { id: "8", name: "f" },
];

describe("test ResultSection", () => {
    test("data is returned by id", () => {
        const result = findInfoById(dummyCat, "1");
        expect(result).toEqual({ id: "1", name: "a" });
    });
    describe("test getLastIdx", () => {
        test("should return data length if expected last idx (lastIdx + offset) is bigger than data length", () => {
            const lastIdx = 5;
            const offSet = 10;
            const result = getLastIdx(dummyCat, lastIdx, offSet);
            expect(result).toBe(8);
        });
        test("should return expected last idx (lastIdx + offset) if it is smaller than data length", () => {
            const lastIdx = 0;
            const offSet = 5;
            const result = getLastIdx(dummyCat, lastIdx, offSet);
            expect(result).toBe(5);
        });
        test("should return data length if offset equals data length", () => {
            const lastIdx = 0;
            const offSet = 8;
            const result = getLastIdx(dummyCat, lastIdx, offSet);
            expect(result).toBe(8);
        });
    });
});

// test("테스트 설명", () => {
//     expect("검증 대상").toXxx("기대 결과")
//   })
// describe('when there is initially some notes saved', () => {
//     test('notes are returned as json', async () => {
//       await api
//         .get('/api/notes')
//         .expect(200)
//         .expect('Content-Type', /application\/json/)
//     })

//     test('all notes are returned', async () => {
//       const response = await api.get('/api/notes')

//       expect(response.body).toHaveLength(helper.initialNotes.length)
//     })

//     test('a specific note is within the returned notes', async () => {
//       const response = await api.get('/api/notes')

//       const contents = response.body.map(r => r.content)
//       expect(contents).toContain(
//         'Browser can execute only Javascript'
//       )
//     })
//   })
