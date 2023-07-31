// import {createAsyncThunk} from '@reduxjs/toolkit';
// import httpClient from '../../../services/utils/httpClient';
// import {ResponseData} from '../../../types/common';
// import {Question} from '../../../types/question';

// export const createKahoot = createAsyncThunk(
//   'kahoot/createKahoot',
//   async (data: Question, thunkAPI) => {
//     console.log('data', data);

//     try {
//       const formData = new FormData();
//       formData.append(
//         'kahoot',
//         JSON.stringify({
//           title: data.title,
//           description: data.description,
//           theme: data.theme.toLocaleLowerCase(),
//           visibleScope: data.visibleScope,
//           media: data.media,
//           coverImage: data.coverImage,
//           questions: data.questions,
//         }),
//       );
//       data.images!.forEach(image => {
//         formData.append('images', image);
//       });
//       const response = await httpClient.post<ResponseData>({
//         url: '/kahoots',
//         data: formData,
//         config: {
//           signal: thunkAPI.signal,
//           headers: {
//             'ngrok-skip-browser-warning': 'true',
//             'Content-Type': 'multipart/form-data',
//           },
//         },
//       });
//       console.log('response', response);

//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   },
// );
