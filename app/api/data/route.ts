// app/api/data/route.ts
import { NextResponse } from "next/server";
import { InfluxDB } from "@influxdata/influxdb-client";

const url = process.env.INFLUXDB_URL!;
const token = process.env.INFLUXDB_TOKEN!;
const org = process.env.INFLUXDB_ORG!;
const bucket = process.env.INFLUXDB_BUCKET!;

export async function GET() {
  const client = new InfluxDB({ url, token });
  const queryApi = client.getQueryApi(org);

  // 1h range, filter on your two fields, then pivot
  const fluxQuery = `
    from(bucket: "${bucket}")
      |> range(start: -1h)
      |> filter(fn: (r) =>
          r._measurement == "module_data" and
          (r._field == "Temperature" or r._field == "Humidity")
        )
      // 1-second windows, take the last point in each window
      |> aggregateWindow(every: 1s, fn: last, createEmpty: false)
      |> pivot(
           rowKey:   ["_time"],
           columnKey:["_field"],
           valueColumn: "_value"
         )
      |> keep(columns: ["_time", "Temperature", "Humidity"])
      |> sort(columns: ["_time"], desc: false)
      |> limit(n:50)
  `;

  const rows: Array<{ time: string; Temperature?: number; Humidity?: number }> =
    [];
  return new Promise((resolve, reject) => {
    queryApi.queryRows(fluxQuery, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);

        rows.push({
          time: o._time,
          Temperature: o.Temperature,
          Humidity: o.Humidity,
        });
      },
      error(err) {
        console.error("Flux query error:", err);
        reject(NextResponse.json({ error: err.message }, { status: 500 }));
      },
      complete() {
        resolve(NextResponse.json(rows));
      },
    });
  });
}
