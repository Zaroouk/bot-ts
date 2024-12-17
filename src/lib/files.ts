import { glob } from 'glob'

export async function LoadFiles(dir:string):Promise<string[]>{
    const isDev = __filename.endsWith('.ts')

    const fullPath = `${process.cwd()}/${isDev ? 'src' : 'dist'}`

    const files = await glob(`${fullPath}/${dir}/**/*.${isDev ? 'ts' : 'js'}`)

    files.forEach((file: string) => delete require.cache[require.resolve(file)]);

    return files
}