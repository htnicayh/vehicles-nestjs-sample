import { 
    IsNumber,
    Min,
    Max,
    IsLongitude,
    IsLatitude, 
    IsString
} from "class-validator";

export class CreateReportDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2030)
    year: number;

    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage: number;
    
    @IsLongitude()
    longtitude: number;

    @IsLatitude()
    latitude: number;

    @IsNumber()
    @Min(0)
    price: number;
}