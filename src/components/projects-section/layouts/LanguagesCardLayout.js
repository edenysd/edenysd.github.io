import ProgressBarLayout from "./ProgressBarLayout"

const LanguagesCardLayout = ({ languages }) => {
    return (
        <div className={"flex flex-col h-auto py-3 w-auto font-mono text-xl"}>
            <p className="font-semibold">
                Languages
            </p>
            {
                Object.keys(languages).map((language) =>
                    <ProgressBarLayout
                        key={language}
                        textGenerator={(progressInput) => language + " " + progressInput + "%"}
                        progress={languages[language]}
                    />
                )
            }
        </div>
    )
}

export default LanguagesCardLayout