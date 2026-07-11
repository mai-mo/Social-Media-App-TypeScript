import { HydratedDocument } from "mongoose"

export interface IPaginate<TRawDoc> {
    docs: HydratedDocument<TRawDoc>[],
}