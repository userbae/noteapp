import { useEffect, useState } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";

interface WeatherData {
  dt_txt: string; // 날짜와 시간
  main: { temp: number; humidity: number }; // 온도 및 습도
  weather: [{ description: string; icon: string }]; // 날씨 설명 및 아이콘
  pop: number; // 강수 확률
}

export const Weather = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  const [weather, setWeather] = useState<WeatherData[] | null>(null);
  const [, setError] = useState<string | null>(null);

  const api = import.meta.env.VITE_WEATHER_API_KEY;

  // 위치 정보 가져오기
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    },
    (err) =>
      setError(`위치를 가져올 수 없습니다. 위치 권한을 확인해주세요.${err}`)
  );

  // 날씨 데이터 가져오기
  const getWeather = async () => {
    if (lat == null || long == null) return;
    const data = await fetch(
      `https://pro.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${api}&units=metric&lang=kr`
    );

    const result = await data.json();
    setWeather(result.list); // 시간별 예보 가져오기
  };

  useEffect(() => {
    getWeather();
  }, [lat, long]);

  // 현재 시간 이후의 데이터만 필터링
  const filteredWeather = weather?.filter((forecast) => {
    const forecastTime = Date.parse(forecast.dt_txt); // 예보 시간
    const currentTime = Date.now(); // 현재 시간
    return forecastTime > currentTime; // 현재 시간 이후의 데이터만 반환
  });
  return (
    <div className="flex items-center w-full h-full bg-white rounded-lg p-3 gap-2 ">
      <div
        className="drag-handle cursor-grab h-full items-center flex"
        children={<RxDragHandleDots2 />}
      />
      {lat && filteredWeather ? (
        <div className="flex flex-col w-full overflow-hidden overflow-x-auto h-full overflow-y-hidden @container">
          <div className="text-center font-semibold mb-4 text-sm">
            날씨 예보
          </div>
          {/* small weather */}

          <div className="flex flex-1 @[200px]:hidden flex-col items-center p-2">
            <p>{filteredWeather[0].dt_txt.split(" ")[1].split(":")[0]}시</p>
            <img
              src={`http://openweathermap.org/img/wn/${filteredWeather[0].weather[0].icon}.png`}
              alt={filteredWeather[0].weather[0].description}
              className="w-12 h-12"
            />
            <p>{filteredWeather[0].main.temp}°C</p>
          </div>

          {/* big weather */}
          <div className="hidden gap-2 flex-1 @[200px]:flex ">
            {filteredWeather.map((forecast, index) => {
              const date = new Date(forecast.dt_txt); // 예보 시간
              const hours = date.getHours(); // 시간 가져오기 (0~23)
              const day = date.getDate(); // 날짜 가져오기
              const now = new Date();
              const today = now.getDate(); // 오늘 날짜
              const tomorrow = today + 1; // 내일 날짜

              // 오늘과 내일의 예보만 표시
              if (day === today || day === tomorrow) {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center p-2 justify-center"
                  >
                    <p>
                      {hours}시{/* 시간만 "15시", "18시" 형식으로 표시 */}
                    </p>
                    <img
                      src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                      alt={forecast.weather[0].description}
                      className="w-12 h-12"
                    />

                    <p>{forecast.main.temp}°C</p>
                    {}
                  </div>
                );
              }
              return null; // 오늘/내일 외의 예보는 제외
            })}
          </div>
        </div>
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  );
};
