const BASE_URL = '/api/v3';

export const createUrl = (url: string): string => {
  const trimmedUrl = url.trim();

  // BASE_URL이 포함된 경우 해당 부분을 제외한 경로만 추출
  const urlWithoutBaseUrl =
    BASE_URL && trimmedUrl.startsWith(BASE_URL)
      ? trimmedUrl.slice(BASE_URL.length)
      : trimmedUrl;

  // 프로토콜(http://, https://)을 제외한 경로에서 연속된 슬래시 검사
  const pathWithoutProtocol = urlWithoutBaseUrl.replace(/^https?:\/\//, '');
  if (pathWithoutProtocol.includes('//')) {
    throw new Error('URL 경로에 연속된 슬래시가 포함될 수 없습니다.');
  }

  let path = urlWithoutBaseUrl;

  // 경로가 슬래시로 시작하지 않으면 추가
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }

  // BASE_URL이 없는 경우 path만 반환
  if (!BASE_URL) {
    return path;
  }

  return BASE_URL + path;
};
