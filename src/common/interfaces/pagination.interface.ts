import { HydratedDocument } from "mongoose"

export interface IPaginate <TRawDoc>{
        docs: HydratedDocument<TRawDoc>[],
        currentPage?: number | string | undefined,
        pages?: number | string
        size?: number | string | undefined
    }