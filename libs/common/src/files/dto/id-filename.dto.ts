import { IdDto } from '@app/common/usual';
import { FilenameDto } from './filename.dto';
import { IntersectionType } from '@nestjs/swagger';

export class IdFilenameDto extends IntersectionType(IdDto, FilenameDto) {}
