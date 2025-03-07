import { getUuid, getUuidCached } from "@/actions/get-uuid";
import { Waiter } from "@a10adotapp/react-waiter";

export async function ComponentSample(props: {
  label: string;
  delay: number;
}) {
  return (
    <Waiter
      orders={{
        getUuidResult: getUuid(props.delay),
        getUuidCachedResult: getUuidCached(props.delay),
      }}
      sideshow={<div>Loading...</div>}
      serve={({
        getUuidResult,
        getUuidCachedResult,
      }) => (
        <table className="w-full">
          <tbody>
            <tr>
              <th className="w-40 text-end text-gray-800">label</th>
              <td className="px-2 text-gray-600">{props.label}</td>
            </tr>
            <tr>
              <th className="w-40 text-end text-gray-800">uuid</th>
              <td className="px-2 text-gray-600">{getUuidResult.value || getUuidResult.error?.message || "-"}</td>
            </tr>
            <tr>
              <th className="w-40 text-end text-gray-800">uuid (cached)</th>
              <td className="px-2 text-gray-600">{getUuidCachedResult.value || getUuidCachedResult.error?.message || "-"}</td>
            </tr>
          </tbody>
        </table>
      )} />
  );
}
