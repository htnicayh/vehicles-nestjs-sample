import { 
    IsNumber,
    Min,
    Max,
    IsLongitude,
    IsLatitude, 
    IsString
} from "class-validator";
import { Transform } from "class-transformer";

export class EstimateReportDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1930)
    @Max(2030)
    year: number;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage: number;
    
    @Transform(({ value }) => parseFloat(value))
    @IsLongitude()
    longtitude: number;

    @Transform(({ value }) => parseFloat(value))
    @IsLatitude()
    latitude: number;
}