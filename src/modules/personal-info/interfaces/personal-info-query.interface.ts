import { IPaginationQuery } from "src/common/interfaces/pagination-query.interface";

export interface IPersonalInfoQuery extends IPaginationQuery {
    title?: string;
}